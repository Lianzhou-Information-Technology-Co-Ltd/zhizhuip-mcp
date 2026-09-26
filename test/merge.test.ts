import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  PRODUCTS, buildTools, loadOverrides, mergeGroup, parsePage, placePages, productOf, tokens,
  type Page, type ToolOverride,
} from '../scripts/lib/merge.js';
import type { JsonSchema } from '../src/types.js';

const T = {
  noExpiry: '用户IP子账号管理/动态住宅流量子账号(永久)',
  monthly: '用户IP子账号管理/动态住宅流量子账号(期限)',
  standard: '用户IP子账号管理/静态住宅（非原生）时长子账号',
  native: '用户IP子账号管理/静态住宅（原生）时长子账号',
  ipv6: '用户IP子账号管理/静态住宅（IPV6）时长子账号',
  datacenter: '用户IP子账号管理/数据中心时长子账号',
  tool: '工具管理',
};
type P = [name: string, required: boolean, type?: JsonSchema['type'], description?: string];
const page = (id: string, path: string, tag: string, params: P[], fixedValues: Record<string, number> = {}): Page => ({
  id, path, summary: 's', tag, fixedValues,
  params: params.map(([name, required, type = 'string', description = '']) => ({ name, required, schema: { type }, description })),
});
const ov = (name: string, extra: Partial<ToolOverride> = {}): ToolOverride => ({ name, title: name, description: 'd', ...extra });

afterEach(() => vi.restoreAllMocks());

describe('tokens', () => {
  it('拆开括号参数名', () => {
    expect(tokens('content[0][ids][0]')).toEqual(['content', '0', 'ids', '0']);
    expect(tokens('sub_accounts[]')).toEqual(['sub_accounts', '']);
    expect(tokens('page')).toEqual(['page']);
  });
});

describe('productOf', () => {
  it('按文档站分组识别产品，分组名里的空白忽略；无产品分组返回 undefined；未登记的报错', () => {
    expect(productOf({ id: 'a', tag: T.noExpiry })).toBe('dynamic-no-expiry');
    expect(productOf({ id: 'a', tag: '用户IP子账号管理/静态住宅（运营商原生） 时长子账号' })).toBe('static-isp-native');
    expect(productOf({ id: 'a', tag: T.tool })).toBeUndefined();
    expect(() => productOf({ id: 'a', tag: '用户IP子账号管理/移动住宅子账号' })).toThrow(/未登记的文档分组/);
  });
});

describe('parsePage', () => {
  it('提取 path、summary、分组、固定值；剔除 access_token 与 header 参数；合并 query 与 body；去掉 HTML', () => {
    const md = [
      '# 标题', '', '```yaml', 'openapi: 3.0.1', 'paths:', '  /externalapi/device/accountList:', '    get:', '      summary: 列表',
      '      tags:', `        - ${T.standard}`, '      parameters:',
      '        - name: access_token', '          in: query', '          required: true', '          schema:', '            type: string',
      '        - name: token', '          in: header', '          schema:', '            type: string',
      '        - name: type', '          in: query', "          description: 套餐类型：0=全球动态住宅，1=全球静态住宅。<b>此处固定为：1</b>", '          required: true', '          schema:', '            type: integer',
      '        - name: native', '          in: query', '          description: 原生:0=非原生,1=本土原生。此处固定为：0', '          required: true', '          schema:', '            type: integer',
      '        - name: page', '          in: query', '          required: true', '          schema:', '            type: integer',
      '      requestBody:', '        content:', '          application/x-www-form-urlencoded:', '            schema:', '              type: object',
      '              properties:', '                remark:', '                  type: string', "                  description: 备注，可从<a href='/x'>列表</a>查", '                access_token:', '                  type: string',
      '              required:', '                - remark', '```', '',
    ].join('\n');
    const p = parsePage('api-1', md);
    expect(p).toMatchObject({ id: 'api-1', path: '/externalapi/device/accountList', summary: '列表', tag: T.standard, fixedValues: { type: 1, native: 0 } });
    expect(p.params.map(x => x.name)).toEqual(['type', 'native', 'page', 'remark']);
    expect(p.params[0].description).toBe('套餐类型：0=全球动态住宅，1=全球静态住宅。此处固定为：1');
    expect(p.params[3]).toEqual({ name: 'remark', required: true, schema: { type: 'string' }, description: '备注，可从列表查' });
  });

  it('没有 yaml 块或不止一个 path 时报错', () => {
    expect(() => parsePage('x', '# 空')).toThrow(/没有 yaml 块/);
    expect(() => parsePage('x', '```yaml\npaths:\n  /a:\n    get: {}\n  /b:\n    get: {}\n```')).toThrow(/恰好一个 path/);
  });

  it('一个 path 下有两个动词时报错，不能悄悄只取第一个', () => {
    expect(() => parsePage('x', '```yaml\npaths:\n  /a:\n    get:\n      summary: s\n    post:\n      summary: s\n```')).toThrow(/恰好一个动词/);
  });
});

describe('placePages', () => {
  const p = (id: string, path: string, tag: string): Page => ({ id, path, summary: 's', tag, fixedValues: {}, params: [] });
  const files = (...pages: Page[]) => [...placePages(pages).keys()];

  it('目录就是产品枚举值，无产品分组用 tool/user，文件名取接口路径', () => {
    expect(files(p('api-1', '/externalapi/device/accountList', T.monthly))).toEqual(['dynamic-monthly/device-accountList.md']);
    expect(files(p('api-2', '/externalapi/product_order/createOrderBack', T.native))).toEqual(['static-native/product_order-createOrderBack.md']);
    expect(files(p('api-3', '/externalapi/conpons/conponList', T.tool))).toEqual(['tool/conpons-conponList.md']);
  });

  it('同一分组同一接口有多页时都带页面 id 后缀', () => {
    expect(files(
      p('api-8', '/externalapi/set_meal/renewOrder', T.datacenter),
      p('api-9', '/externalapi/set_meal/renewOrder', T.datacenter),
      p('api-7', '/externalapi/device/accountList', T.datacenter),
    )).toEqual(['datacenter/set_meal-renewOrder.api-8.md', 'datacenter/set_meal-renewOrder.api-9.md', 'datacenter/device-accountList.md']);
  });
});

describe('mergeGroup', () => {
  it('多产品页合并成一个工具：产品参数不进 schema，换成排在最前的必填 product 枚举，并带展开表', () => {
    const t = mergeGroup([
      page('a', '/p', T.standard, [['type', true, 'integer', '此处固定为：1'], ['status', true, 'integer'], ['native', true, 'integer', '此处固定为：0'], ['country', true, 'string', '国家编码']]),
      page('b', '/p', T.datacenter, [['type', true, 'integer', '此处固定为：2'], ['status', true, 'integer'], ['country', true, 'string', '国家编码']]),
    ], ov('x'));
    expect(Object.keys(t.inputSchema.properties)).toEqual(['product', 'country']);
    expect(t.inputSchema.properties.product).toEqual({
      type: 'string', enum: ['static-standard', 'datacenter'], description: '产品：static-standard=静态住宅（非原生），datacenter=数据中心',
    });
    expect(t.inputSchema.required).toEqual(['product', 'country']);
    expect(t.products).toEqual({ 'static-standard': { type: 1, status: 1, native: 0 }, datacenter: { type: 2, status: 1 } });
    expect(t.fixed).toBeUndefined();
    expect(t.inputSchema.additionalProperties).toBe(false);
  });

  it('只有一个产品：没有 product 参数，产品组合进 fixed，并与 overrides 的 fixed 合并', () => {
    const t = mergeGroup([page('a', '/p', T.ipv6, [['type', true, 'integer'], ['num', true, 'integer']])], ov('x', { fixed: { pay: 'balance' } }));
    expect(t.inputSchema.properties.product).toBeUndefined();
    expect(t.products).toBeUndefined();
    expect(t.fixed).toEqual({ type: 1, status: 1, native: 1, version: 6, pay: 'balance' });
    expect(t.inputSchema.required).toEqual(['num']);
  });

  it('无产品分组的页参数照文档保留', () => {
    const t = mergeGroup([page('a', '/p', T.tool, [['type', true, 'integer', '套餐类型'], ['status', true, 'integer']])], ov('x'));
    expect(Object.keys(t.inputSchema.properties)).toEqual(['type', 'status']);
    expect(t.inputSchema.required).toEqual(['type', 'status']);
    expect(t.products).toBeUndefined();
  });

  it('overrides 的 products 可以指定页面之外的产品；未知产品报错', () => {
    const t = mergeGroup([page('a', '/p', T.noExpiry, [['is_month', false, 'integer', '此处固定为：1'], ['id', false, 'integer']])], ov('x', { products: ['dynamic-no-expiry', 'dynamic-monthly'] }));
    expect(t.inputSchema.properties.product?.enum).toEqual(['dynamic-no-expiry', 'dynamic-monthly']);
    expect(t.products).toEqual({ 'dynamic-no-expiry': { type: 0, status: 0 }, 'dynamic-monthly': { type: 0, status: 0, is_month: 1 } });
    expect(() => mergeGroup([page('a', '/p', T.noExpiry, [])], ov('x', { products: ['dynamic-weekly'] }))).toThrow(/未知的产品 dynamic-weekly/);
  });

  it('页面固定值与产品表不一致时打印警告，仍按产品表处理', () => {
    const warn = vi.spyOn(console, 'error').mockImplementation(() => {});
    const t = mergeGroup([page('api-9', '/p', T.noExpiry, [['is_month', false, 'integer', '此处固定为：1']], { is_month: 1 })], ov('x'));
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/api-9.*is_month.*固定为 1.*dynamic-no-expiry/));
    expect(t.fixed).toEqual({ type: 0, status: 0 });
    warn.mockClear();
    mergeGroup([page('api-8', '/p', T.datacenter, [['type', true, 'integer', '此处固定为：2']], { type: 2 })], ov('x'));
    expect(warn).not.toHaveBeenCalled();
  });

  it('必填取所有产品页的交集，部分必填按产品名写进描述', () => {
    const t = mergeGroup([
      page('a', '/p', T.noExpiry, [['num', true, 'integer'], ['agree', true, 'string', '协议'], ['country', true, 'string', '国家']]),
      page('b', '/p', T.monthly, [['num', true, 'integer'], ['agree', false, 'string', '协议'], ['country', false, 'string', '国家']]),
    ], ov('x'));
    expect(t.inputSchema.required).toEqual(['product', 'num']);
    expect(t.inputSchema.properties.agree.description).toBe('协议。产品 dynamic-no-expiry 下必填');
  });

  it('括号参数转成对象数组，index 0 的必填决定 items.required 与顶层必填', () => {
    const t = mergeGroup([page('a', '/p', T.native, [
      ['content[0][id]', true], ['content[0][customPassword]', true], ['content[1][id]', false], ['content[1][customPassword]', false],
    ])], ov('x'));
    expect(t.inputSchema.properties.content).toEqual({
      type: 'array',
      items: { type: 'object', properties: { id: { type: 'string' }, customPassword: { type: 'string' } }, required: ['id', 'customPassword'], additionalProperties: false },
    });
    expect(t.inputSchema.required).toEqual(['content']);
  });

  it('子账号 id 类参数一律 string：顶层、数组元素、嵌套对象里的 id/ids/account 都是', () => {
    const t = mergeGroup([page('a', '/p', T.standard, [
      ['account', true, 'integer', '子账号id'], ['subAccount', false, 'integer'], ['ids', false, 'string'], ['sub_accounts[0]', true, 'array'],
      ['content[0][ids][0]', true, 'integer'], ['content[0][country]', true], ['accounts[0][account]', false], ['accounts[0][limit_flow]', false],
      ['country_id', true, 'integer', '国家 id'],
    ])], ov('x'));
    const p = t.inputSchema.properties;
    expect(p.account).toEqual({ type: 'string', description: '子账号id' });
    expect(p.subAccount.type).toBe('string');
    expect(p.sub_accounts).toEqual({ type: 'array', items: { type: 'string' } });
    expect(p.content.items?.properties?.ids).toEqual({ type: 'array', items: { type: 'string' } });
    expect(p.accounts.items?.properties?.account.type).toBe('string');
    expect(p.country_id.type).toBe('integer');
  });

  it('country/country_code 追加 ISO 说明，描述已含 ISO 或"名称"时不追加；pagesize 追加最大 100', () => {
    const t = mergeGroup([page('a', '/p', T.standard, [
      ['country', true, 'string', '国家编码'], ['country_code', false, 'string', '国家用 ISO 二字码'], ['pagesize', false, 'integer', '每页数量'],
    ])], ov('x'));
    expect(t.inputSchema.properties.country.description).toBe('国家编码。国家用 ISO 3166-1 二字码，如 US');
    expect(t.inputSchema.properties.country_code.description).toBe('国家用 ISO 二字码');
    expect(t.inputSchema.properties.pagesize.description).toBe('每页数量，最大 100');
    const b = mergeGroup([page('a', '/p', T.standard, [['country', true, 'string', '预约国家名称，无需编码']])], ov('x'));
    expect(b.inputSchema.properties.country.description).toBe('预约国家名称，无需编码');
  });

  it('overrides 的 drop、params、readOnly 生效，readOnly 决定动词；引用不存在的参数报错', () => {
    const t = mergeGroup([page('a', '/p', T.standard, [['pay_method', false], ['bandwidth_num', false, 'string'], ['remark', true, 'integer', '退单备注']])], ov('x', {
      readOnly: true, drop: ['pay_method'],
      params: { bandwidth_num: { type: 'integer', required: true }, remark: { type: 'string' } },
    }));
    expect(t.inputSchema.properties.pay_method).toBeUndefined();
    expect(t.inputSchema.properties.bandwidth_num.type).toBe('integer');
    expect(t.inputSchema.properties.remark).toEqual({ type: 'string', description: '退单备注' });
    expect(t.inputSchema.required).toEqual(['bandwidth_num', 'remark']);
    expect(t.method).toBe('GET');
    expect(mergeGroup([page('a', '/p', T.standard, [])], ov('x')).method).toBe('POST');
    expect(() => mergeGroup([page('a', '/p', T.standard, [])], ov('x', { params: { nope: { type: 'integer' } } }))).toThrow(/nope/);
  });

  it('类型冲突时 integer 优先，描述取最长；一页 array 一页标量时取标量', () => {
    const t = mergeGroup([
      page('a', '/p', T.standard, [['search_type', false, 'integer', '搜索类型'], ['page', false, 'array']]),
      page('b', '/p', T.native, [['search_type', false, 'string', '搜索类型：0=账密，1=IP'], ['page', false, 'string', '分页']]),
    ], ov('x'));
    expect(t.inputSchema.properties.search_type).toEqual({ type: 'integer', description: '搜索类型：0=账密，1=IP' });
    expect(t.inputSchema.properties.page).toEqual({ type: 'string', description: '分页' });
  });
});

describe('buildTools', () => {
  const base = { ignore: [] as string[], tools: {}, derived: [] };

  it('未配置的路径报错并列出路径；ignore 的路径跳过', () => {
    const pages = [page('a', '/externalapi/new/thing', T.standard, []), page('b', '/externalapi/tool/deleteSubAccountWhiteList', T.noExpiry, [])];
    expect(() => buildTools(pages, { ...base, ignore: ['/externalapi/tool/deleteSubAccountWhiteList'] })).toThrow(/\/externalapi\/new\/thing/);
    expect(buildTools([pages[1]], { ...base, ignore: ['/externalapi/tool/deleteSubAccountWhiteList'] })).toEqual([]);
  });

  it('split 按产品分组生成多个工具，结果按名字的码点顺序排', () => {
    const pages = [
      page('a', '/buy', T.noExpiry, [['type', true, 'integer'], ['num', true, 'integer']]),
      page('b', '/buy', T.monthly, [['type', true, 'integer'], ['num', true, 'integer'], ['bill_timelen', false, 'integer']]),
      page('c', '/buy', T.standard, [['type', true, 'integer'], ['num', true, 'integer'], ['timelen', true, 'integer']]),
    ];
    const tools = buildTools(pages, { ...base, tools: { '/buy': { split: [
      { ...ov('order_buy_time_ip'), products: ['static-standard'] },
      { ...ov('order_buy_dynamic'), products: ['dynamic-no-expiry', 'dynamic-monthly'] },
    ] } } });
    expect(tools.map(t => t.name)).toEqual(['order_buy_dynamic', 'order_buy_time_ip']);
    expect(Object.keys(tools[0].inputSchema.properties)).toEqual(['product', 'num', 'bill_timelen']);
    expect(tools[1].fixed).toEqual({ type: 1, status: 1, native: 0 });
  });

  it('split 漏掉页面或匹配不到页面时报错', () => {
    const pages = [page('a', '/buy', T.noExpiry, []), page('c', '/buy', T.standard, [])];
    expect(() => buildTools(pages, { ...base, tools: { '/buy': { split: [{ ...ov('x'), products: ['dynamic-no-expiry'] }] } } })).toThrow(/未被拆分规则覆盖/);
    expect(() => buildTools(pages, { ...base, tools: { '/buy': { split: [
      { ...ov('x'), products: ['dynamic-no-expiry', 'static-standard'] }, { ...ov('y'), products: ['datacenter'] },
    ] } } })).toThrow(/没有匹配到任何页面/);
  });

  it('派生工具从来源工具复制并带上 pick；来源不唯一或名字重复时报错', () => {
    const pages = [page('a', '/info', '用户管理', [])];
    const o = { ...base, tools: { '/info': ov('user_info', { readOnly: true }) }, derived: [{ name: 'user_balance', title: '余额', description: 'd', from: '/info', pick: 'money' }] };
    const tools = buildTools(pages, o);
    expect(tools.map(t => t.name)).toEqual(['user_balance', 'user_info']);
    expect(tools[0]).toMatchObject({ path: '/info', readOnly: true, pick: 'money', title: '余额' });
    expect(tools[1].pick).toBeUndefined();
    expect(() => buildTools(pages, { ...o, derived: [{ ...o.derived[0], from: '/nope' }] })).toThrow(/对应 0 个工具/);
    expect(() => buildTools(pages, { ...o, derived: [{ ...o.derived[0], name: 'user_info' }] })).toThrow(/工具名重复/);
  });
});

describe('loadOverrides', () => {
  it('缺 name/title/description、未知产品、派生工具缺字段都报错', () => {
    expect(() => loadOverrides('tools:\n  /p:\n    name: x\n')).toThrow(/\/p 缺 title/);
    expect(() => loadOverrides('tools:\n  /p:\n    name: x\n    title: t\n    description: d\n    products: [nope]\n')).toThrow(/未知的产品 nope/);
    expect(() => loadOverrides('tools: {}\nderived:\n  - name: x\n    from: /p\n')).toThrow(/派生工具 x 缺 title/);
    expect(loadOverrides('tools: {}\n')).toEqual({ ignore: [], tools: {}, derived: [] });
  });
});

describe('PRODUCTS', () => {
  it('七个产品，枚举值与设计文档一致，展开参数正确', () => {
    expect(Object.keys(PRODUCTS)).toEqual(['dynamic-no-expiry', 'dynamic-monthly', 'static-standard', 'static-native', 'static-isp-native', 'static-ipv6', 'datacenter']);
    expect(PRODUCTS['static-ipv6'].params).toEqual({ type: 1, status: 1, native: 1, version: 6 });
    expect(PRODUCTS['dynamic-monthly'].params).toEqual({ type: 0, status: 0, is_month: 1 });
  });
});

// 放在最后：没修好的实现会把 Object.prototype 写脏，影响同一进程里后面的用例
describe('参数名安全', () => {
  it('参数名含 __proto__ 之类的段时报错，不写进原型', () => {
    expect(() => mergeGroup([page('a', '/p', T.standard, [['__proto__[x]', false]])], ov('x'))).toThrow(/不允许/);
    expect(({} as Record<string, unknown>).type).toBeUndefined();
  });
});
