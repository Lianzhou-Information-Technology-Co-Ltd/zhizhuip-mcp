import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { apiPageIds, externalPages } from './lib/docs.js';
import { buildSpec } from './build-spec.js';
import { parsePage, placePages } from './lib/merge.js';

const SITE = 'https://develop.zhizhuip.com';
const SESSION_PAGE = '3837564m0.md'; // 流量期限与不限流量产品的 Session 说明相同，只取这一页
const PAGES = new URL('../spec/pages/', import.meta.url);

async function get(path: string): Promise<string> {
  const res = await fetch(`${SITE}/${path}`, { signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.text();
}

const llms = await get('llms.txt');
const ids = apiPageIds(llms);
if (ids.length < 100) throw new Error(`llms.txt 只找到 ${ids.length} 个接口页，疑似格式变化，中止`);

const raw = new Map<string, string>();
for (let i = 0; i < ids.length; i += 5) {
  await Promise.all(ids.slice(i, i + 5).map(async id => raw.set(id, await get(`${id}.md`))));
}
const parsed = [...raw].map(([id, md]) => parsePage(id, md));
// 文档站把前台 api 模块的几个接口也挂在子账号分组下，它们不认 API Key，不属于本项目
const skipped = parsed.filter(p => !p.path.startsWith('/externalapi/'));
if (skipped.length) console.error(`跳过 ${skipped.length} 个不在 externalapi 下的页面：${[...new Set(skipped.map(p => p.path))].join('、')}`);
const selected = externalPages(parsed);
const duplicates = parsed.length - skipped.length - selected.length;
if (duplicates) console.error(`跳过 ${duplicates} 个已有正式产品分组的重复页面`);
const placed = placePages(selected);
mkdirSync(PAGES, { recursive: true });
for (const [file, page] of placed) {
  mkdirSync(new URL(file.replace(/[^/]+$/, ''), PAGES), { recursive: true });
  writeFileSync(new URL(file, PAGES), raw.get(page.id)!);
}
for (const f of (readdirSync(PAGES, { recursive: true }) as string[]).map(f => f.replaceAll('\\', '/'))) {
  if (f.endsWith('.md') && !placed.has(f)) {
    rmSync(new URL(f, PAGES));
    console.error(`删除已下线页面 ${f}`);
  }
}
writeFileSync(new URL('../spec/dynamic-proxy-session.md', import.meta.url), await get(SESSION_PAGE));
console.error(`已下载 ${placed.size} 个接口页与 Session 说明页`);
buildSpec();
