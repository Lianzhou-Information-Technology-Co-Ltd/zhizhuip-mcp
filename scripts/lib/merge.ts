import { parse as parseYaml } from 'yaml';
import type { JsonSchema, ProductParams, ToolDef } from '../../src/types.js';

export interface RawParam { name: string; required: boolean; schema: JsonSchema; description: string }
export interface Page {
  id: string;
  path: string;
  summary: string;
  /** 文档站分组，页面 yaml 的 tags[0] */
  tag: string;
  /** 页面里写了"此处固定为 N"的产品参数，只用来和产品表交叉核对 */
  fixedValues: Record<string, number>;
  params: RawParam[];
}
export type ParamOverride = Partial<Omit<JsonSchema, 'required'>> & { required?: boolean };
export interface ToolOverride {
  name: string;
  title: string;
  description: string;
  readOnly?: boolean;
  destructive?: boolean;
  /** 显式指定 product 枚举；不写就按有页面的产品自动得出 */
  products?: string[];
  fixed?: Record<string, string | number>;
  drop?: string[];
  params?: Record<string, ParamOverride>;
}
/** 拆分规则：products 既是选页面的条件，也是该工具的 product 枚举 */
export interface SplitPart extends ToolOverride { products: string[] }
/** 从已有工具派生、只取响应 data 里一个字段的工具 */
export interface DerivedTool { name: string; title: string; description: string; from: string; pick: string }
export interface Overrides { ignore: string[]; tools: Record<string, ToolOverride | { split: SplitPart[] }>; derived: DerivedTool[] }

export interface Product { label: string; tag: string; params: ProductParams }

/** 产品表：键就是 product 枚举值与 spec/pages 目录名；tag 是文档站分组；params 是运行期展开成的后端参数 */
export const PRODUCTS: Record<string, Product> = {
  'dynamic-no-expiry': { label: '动态住宅流量（永久）', tag: '用户IP子账号管理/动态住宅流量子账号(永久)', params: { type: 0, status: 0 } },
  'dynamic-monthly': { label: '动态住宅流量（期限）', tag: '用户IP子账号管理/动态住宅流量子账号(期限)', params: { type: 0, status: 0, is_month: 1 } },
  'static-standard': { label: '静态住宅（非原生）', tag: '用户IP子账号管理/静态住宅（非原生）时长子账号', params: { type: 1, status: 1, native: 0 } },
  'static-native': { label: '静态住宅（原生）', tag: '用户IP子账号管理/静态住宅（原生）时长子账号', params: { type: 1, status: 1, native: 1 } },
  'static-isp-native': { label: '静态住宅（运营商原生）', tag: '用户IP子账号管理/静态住宅（运营商原生）时长子账号', params: { type: 1, status: 1, native: 2 } },
  'static-ipv6': { label: '静态住宅（IPv6）', tag: '用户IP子账号管理/静态住宅（IPV6）时长子账号', params: { type: 1, status: 1, native: 1, version: 6 } },
  datacenter: { label: '数据中心', tag: '用户IP子账号管理/数据中心时长子账号', params: { type: 2, status: 1 } },
};
export const PRODUCT_KEYS = Object.keys(PRODUCTS);
/** 后端用来标识产品的参数，带产品的页面上一律不进工具 schema，由 product 展开 */
export const PRODUCT_PARAMS = ['type', 'status', 'native', 'version', 'is_month'];
/** 无产品的文档站分组 → 目录 */
const PLAIN_DIRS: Record<string, string> = { 工具管理: 'tool', 用户管理: 'user' };
/** 子账号 id 类参数：后端经表单收到的本来就是字符串，统一后模型不会因 77 与 "77" 之差被校验拒绝 */
const ID_KEYS = new Set(['id', 'ids', 'subAccount', 'subAccounts', 'account', 'accounts', 'sub_accounts']);
/** 参数名的这几段会写到 Object.prototype 上，把整次生成静默搞坏 */
const UNSAFE_SEGMENTS = new Set(['__proto__', 'constructor', 'prototype']);

const normTag = (tag: string): string => tag.replace(/\s+/g, '');
const productByTag = new Map(PRODUCT_KEYS.map(k => [normTag(PRODUCTS[k].tag), k]));

/** 页面属于哪个产品；无产品分组返回 undefined；未登记的分组报错，文档站新增分组时在这里补 */
export function productOf(page: Pick<Page, 'id' | 'tag'>): string | undefined {
  const tag = normTag(page.tag);
  const product = productByTag.get(tag);
  if (product) return product;
  if (PLAIN_DIRS[tag]) return undefined;
  throw new Error(`${page.id}: 未登记的文档分组「${page.tag}」，请在 PRODUCTS 或 PLAIN_DIRS 补上`);
}

// 文档 YAML 是外部输入，字段形状不受我们控制，解析阶段用 any
type Any = any;

/** 文档描述里夹着 <a href>、<b> 之类的 HTML，对模型是噪音，统一去掉 */
const clean = (d: unknown): string => String(d ?? '').replace(/<[^>]+>/g, '').trim();
const FIXED = /固定(?:类别)?为[：:]?\s*(\d+)/;

function pick(s: Any): JsonSchema {
  const out: JsonSchema = {};
  if (typeof s.type === 'string') out.type = s.type;
  if (s.items?.type) out.items = { type: s.items.type };
  if (Array.isArray(s.enum)) out.enum = s.enum;
  return out;
}

export function parsePage(id: string, md: string): Page {
  const m = md.match(/```yaml\r?\n([\s\S]*?)```/);
  if (!m) throw new Error(`${id}: 页面里没有 yaml 块`);
  const doc = parseYaml(m[1]) as Any;
  const entries = Object.entries(doc?.paths ?? {});
  if (entries.length !== 1) throw new Error(`${id}: 期望恰好一个 path，实际 ${entries.length}`);
  const [path, ops] = entries[0] as [string, Any];
  const verbs = Object.keys(ops ?? {});
  if (verbs.length !== 1) throw new Error(`${id}: 期望恰好一个动词，实际 ${verbs.length}`);
  const op = ops[verbs[0]] as Any;

  const params: RawParam[] = [];
  const add = (name: string, required: boolean, s: Any): void => {
    // 鉴权只走请求头 token，access_token 不进工具参数；同一页 query 与 body 重复声明时只留一份
    if (name === 'access_token' || params.some(q => q.name === name)) return;
    params.push({ name, required, schema: pick(s ?? {}), description: clean(s?.description) });
  };
  for (const p of op.parameters ?? []) {
    if (p.in === 'header') continue;
    add(p.name, !!p.required, { ...(p.schema ?? {}), description: p.description });
  }
  const body = op.requestBody?.content?.['application/x-www-form-urlencoded']?.schema;
  const bodyRequired: string[] = body?.required ?? [];
  for (const [name, s] of Object.entries<Any>(body?.properties ?? {})) add(name, bodyRequired.includes(name), s);

  const fixedValues: Record<string, number> = {};
  for (const p of params) {
    if (!PRODUCT_PARAMS.includes(p.name)) continue;
    const f = p.description.match(FIXED);
    if (f) fixedValues[p.name] = Number(f[1]);
  }
  return { id, path, summary: String(op.summary ?? '').trim(), tag: String(op.tags?.[0] ?? ''), fixedValues, params };
}

/** 全部页面在 spec/pages/ 下的位置：`产品目录/控制器-方法.md`；同一分组同一接口有多页时带上页面 id 区分 */
export function placePages(pages: Page[]): Map<string, Page> {
  const stems = pages.map(p => {
    const dir = productOf(p) ?? PLAIN_DIRS[normTag(p.tag)];
    return `${dir}/${p.path.replace(/^\/externalapi\//, '').replace(/\//g, '-')}`;
  });
  const count = new Map<string, number>();
  for (const stem of stems) count.set(stem, (count.get(stem) ?? 0) + 1);
  return new Map(pages.map((p, i) => [`${stems[i]}${count.get(stems[i])! > 1 ? `.${p.id}` : ''}.md`, p]));
}

/** content[0][ids][0] → ['content','0','ids','0']；sub_accounts[] → ['sub_accounts','']；page → ['page'] */
export function tokens(name: string): string[] {
  const m = name.match(/^([^[]+)((?:\[[^\]]*\])*)$/);
  if (!m) return [name];
  return [m[1], ...[...m[2].matchAll(/\[([^\]]*)\]/g)].map(x => x[1])];
}

const isIndex = (s: string): boolean => s === '' || /^\d+$/.test(s);
const TYPE_RANK: Record<string, number> = { integer: 0, number: 1, boolean: 2, string: 3, array: 4, object: 5 };

function pickType(a?: JsonSchema['type'], b?: JsonSchema['type']): JsonSchema['type'] {
  if (!a) return b;
  if (!b) return a;
  return (TYPE_RANK[a] ?? 9) <= (TYPE_RANK[b] ?? 9) ? a : b;
}

function insert(node: JsonSchema, segs: string[], leaf: JsonSchema): void {
  if (segs.length === 0) {
    node.type = pickType(node.type, leaf.type);
    if (node.type !== 'array') delete node.items; // 某页把标量误写成 array 时，以标量为准
    if (node.type !== 'object') delete node.properties;
    if (leaf.description && (!node.description || leaf.description.length > node.description.length)) node.description = leaf.description;
    if (leaf.enum) node.enum = [...new Set([...(node.enum ?? []), ...leaf.enum])];
    return;
  }
  const [s, ...rest] = segs;
  if (isIndex(s)) {
    if (node.type && node.type !== 'array') return; // 标量已定，忽略把它写成 array 的变体
    node.type = 'array';
    insert((node.items ??= {}), rest, leaf);
  } else {
    node.type = 'object';
    node.properties ??= {};
    insert((node.properties[s] ??= {}), rest, leaf);
  }
}

function locate(root: JsonSchema, base: string, segs: string[]): JsonSchema | undefined {
  let node = root.properties?.[base];
  for (const s of segs) {
    if (!node) return undefined;
    node = isIndex(s) ? node.items : node.properties?.[s];
  }
  return node;
}

interface Track { requiredIn: Set<string>; seenIn: Set<string> }
const trackKey = (base: string, segs: string[]): string => [base, ...segs.map(s => (isIndex(s) ? '[]' : s))].join('.');
function getTrack(track: Map<string, Track>, key: string): Track {
  let t = track.get(key);
  if (!t) track.set(key, (t = { requiredIn: new Set(), seenIn: new Set() }));
  return t;
}

function appendNote(s: JsonSchema, note: string): void {
  s.description = s.description ? `${s.description}。${note}` : note;
}

function finalizeNested(node: JsonSchema, key: string, track: Map<string, Track>): void {
  if (node.type === 'array' && node.items) finalizeNested(node.items, `${key}.[]`, track);
  if (node.type === 'object' && node.properties) {
    node.additionalProperties = false;
    const req = Object.keys(node.properties).filter(k => {
      const t = track.get(`${key}.${k}`);
      return !!t && t.seenIn.size > 0 && [...t.seenIn].every(x => t.requiredIn.has(x));
    });
    if (req.length) node.required = req;
    for (const [k, child] of Object.entries(node.properties)) finalizeNested(child, `${key}.${k}`, track);
  }
}

/** 子账号 id 类参数一律 string：顶层、数组元素、嵌套对象里的 id/ids/account 都改 */
function forceIdStrings(node: JsonSchema, name?: string): void {
  if (name !== undefined && ID_KEYS.has(name)) {
    if (node.type === 'array') {
      node.items ??= {};
      if (node.items.type !== 'object') {
        node.items.type = 'string';
        delete node.items.enum;
      }
    } else if (node.type !== 'object') {
      node.type = 'string';
      delete node.enum;
    }
  }
  if (node.type === 'array' && node.items) forceIdStrings(node.items);
  if (node.type === 'object' && node.properties) for (const [k, child] of Object.entries(node.properties)) forceIdStrings(child, k);
}

export function mergeGroup(pages: Page[], ov: ToolOverride): ToolDef {
  const detected = PRODUCT_KEYS.filter(k => pages.some(p => productOf(p) === k));
  const products = ov.products ?? detected;
  for (const k of products) if (!PRODUCTS[k]) throw new Error(`${ov.name}: 未知的产品 ${k}`);
  const hasProduct = products.length > 0 || pages.some(p => productOf(p) !== undefined);

  // 页面写的固定值只用来核对：文档站把页面挂错分组或写错固定值时能被看见，处理仍以产品表为准
  for (const page of pages) {
    const k = productOf(page);
    if (!k) continue;
    for (const [name, v] of Object.entries(page.fixedValues)) {
      const expected = PRODUCTS[k].params[name];
      if (expected !== v) console.error(`警告：${page.id} 的 ${name} 写成固定为 ${v}，与产品 ${k} 的 ${name}=${expected ?? '不传'} 不一致，按产品表处理`);
    }
  }

  const props: Record<string, JsonSchema> = {};
  const root: JsonSchema = { type: 'object', properties: props };
  const track = new Map<string, Track>();
  const pageKeys = pages.map(p => productOf(p) ?? p.id);

  // 1. 合并全部变体页
  for (const page of pages) {
    const key = productOf(page) ?? page.id;
    for (const raw of page.params) {
      if (ov.drop?.includes(raw.name)) continue;
      if (hasProduct && PRODUCT_PARAMS.includes(raw.name)) continue;
      const [base, ...segs] = tokens(raw.name);
      const unsafe = [base, ...segs].find(s => UNSAFE_SEGMENTS.has(s));
      if (unsafe) throw new Error(`${page.id}: 参数名 ${raw.name} 含不允许的段 ${unsafe}`);
      let leaf: JsonSchema = { ...raw.schema };
      if (leaf.type === 'array') {
        leaf = leaf.items ?? { type: 'string' };
        if (segs.length === 0) segs.push('');
      }
      if (raw.description) leaf.description = raw.description;
      // 只有下标段全是 0 或空的路径才算数：content[1][id] 不影响 content 的必填；键名段（id）不参与判断
      const primary = segs.filter(isIndex).every(s => s === '' || s === '0');
      for (let i = 0; i <= segs.length; i++) {
        const t = getTrack(track, trackKey(base, segs.slice(0, i)));
        t.seenIn.add(key);
        if (raw.required && primary) t.requiredIn.add(key);
      }
      insert((props[base] ??= {}), segs, leaf);
    }
  }

  // 2. 参数级 overrides
  for (const [rawName, o] of Object.entries(ov.params ?? {})) {
    const [base, ...segs] = tokens(rawName);
    const node = locate(root, base, segs);
    if (!node) throw new Error(`${ov.name}: overrides 参数 ${rawName} 在文档里不存在`);
    const { required, ...rest } = o;
    Object.assign(node, rest);
    if (required !== undefined) {
      const all = required ? new Set(pageKeys) : new Set<string>();
      getTrack(track, trackKey(base, [])).requiredIn = new Set(all);
      getTrack(track, trackKey(base, segs)).requiredIn = new Set(all);
    }
  }

  // 3. 子账号 id 一律 string
  forceIdStrings(root);

  // 4. 通用描述补充
  for (const [name, s] of Object.entries(props)) {
    if ((name === 'country' || name === 'country_code') && !/ISO|名称/.test(s.description ?? '')) appendNote(s, '国家用 ISO 3166-1 二字码，如 US');
    if (name === 'pagesize' && !/100/.test(s.description ?? '')) s.description = `${s.description ?? '每页数量'}，最大 100`;
  }

  // 5. 必填：顶层要在全部变体都必填；部分必填按产品名写进描述
  const productKeyed = pageKeys.every(k => !!PRODUCTS[k]);
  const required: string[] = [];
  for (const [name, s] of Object.entries(props)) {
    const t = getTrack(track, name);
    if (pageKeys.every(k => t.requiredIn.has(k))) required.push(name);
    else if (t.requiredIn.size && productKeyed) appendNote(s, `产品 ${PRODUCT_KEYS.filter(k => t.requiredIn.has(k)).join('、')} 下必填`);
    finalizeNested(s, name, track);
  }

  // 6. product 参数：两个及以上产品出枚举；只有一个产品把组合写进 fixed
  let properties = props;
  let fixed = ov.fixed;
  let productsOut: ToolDef['products'];
  if (products.length >= 2) {
    properties = {
      product: { type: 'string', enum: products, description: '产品：' + products.map(k => `${k}=${PRODUCTS[k].label}`).join('，') },
      ...props,
    };
    required.unshift('product');
    productsOut = Object.fromEntries(products.map(k => [k, PRODUCTS[k].params]));
  } else if (products.length === 1) {
    fixed = { ...PRODUCTS[products[0]].params, ...ov.fixed };
  }

  return {
    name: ov.name,
    title: ov.title,
    description: ov.description,
    readOnly: !!ov.readOnly,
    destructive: !!ov.destructive,
    method: ov.readOnly ? 'GET' : 'POST',
    path: pages[0].path,
    ...(fixed ? { fixed } : {}),
    ...(productsOut ? { products: productsOut } : {}),
    inputSchema: { type: 'object', properties, required, additionalProperties: false },
  };
}

export function buildTools(pages: Page[], ov: Overrides): ToolDef[] {
  const byPath = new Map<string, Page[]>();
  for (const p of pages) byPath.set(p.path, [...(byPath.get(p.path) ?? []), p]);

  const missing = [...byPath.keys()].filter(p => !ov.ignore.includes(p) && !ov.tools[p]);
  if (missing.length) throw new Error(`overrides.yaml 缺少这些路径的配置（文档新增了接口？）：\n${missing.join('\n')}`);
  for (const p of Object.keys(ov.tools)) if (!byPath.has(p)) console.error(`警告：overrides 里的 ${p} 在文档中已不存在`);

  const tools: ToolDef[] = [];
  for (const [path, group] of byPath) {
    const o = ov.tools[path];
    if (!o) continue;
    if ('split' in o) {
      const belongs = (p: Page, part: SplitPart) => part.products.includes(productOf(p) ?? '');
      const unassigned = group.filter(p => !o.split.some(part => belongs(p, part)));
      if (unassigned.length) throw new Error(`${path} 有页面未被拆分规则覆盖：${unassigned.map(p => p.id).join(', ')}`);
      for (const part of o.split) {
        const sub = group.filter(p => belongs(p, part));
        if (!sub.length) throw new Error(`${path} 的拆分 ${part.name} 没有匹配到任何页面`);
        tools.push(mergeGroup(sub, part));
      }
    } else {
      tools.push(mergeGroup(group, o));
    }
  }
  for (const d of ov.derived) {
    const base = tools.filter(t => t.path === d.from);
    if (base.length !== 1) throw new Error(`派生工具 ${d.name} 的来源 ${d.from} 对应 ${base.length} 个工具，需要恰好 1 个`);
    tools.push({ ...base[0], name: d.name, title: d.title, description: d.description, pick: d.pick });
  }
  const dup = tools.map(t => t.name).filter((n, i, a) => a.indexOf(n) !== i);
  if (dup.length) throw new Error(`工具名重复：${dup.join(', ')}`);
  // 按码点排序，不用 localeCompare：下划线与字母的相对顺序在各 locale 下不一样，快照会漂
  return tools.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

export function loadOverrides(yamlText: string): Overrides {
  const raw = parseYaml(yamlText) as Any;
  const ov: Overrides = { ignore: raw?.ignore ?? [], tools: raw?.tools ?? {}, derived: raw?.derived ?? [] };
  const bad: string[] = [];
  for (const [path, o] of Object.entries(ov.tools)) {
    const parts: ToolOverride[] = 'split' in o ? o.split : [o];
    for (const p of parts) {
      for (const f of ['name', 'title', 'description'] as const) if (!p[f]) bad.push(`${path} 缺 ${f}`);
      for (const k of p.products ?? []) if (!PRODUCTS[k]) bad.push(`${path} 未知的产品 ${k}`);
    }
  }
  for (const d of ov.derived) {
    for (const f of ['name', 'title', 'description', 'from', 'pick'] as const) if (!d[f]) bad.push(`派生工具 ${d.name ?? '?'} 缺 ${f}`);
  }
  if (bad.length) throw new Error(`overrides.yaml 不完整：\n${bad.join('\n')}`);
  return ov;
}
