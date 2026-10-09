import { describe, expect, it } from 'vitest';
import { apiPageIds, externalPages } from '../scripts/lib/docs.js';
import { placePages, type Page } from '../scripts/lib/merge.js';

const page = (id: string, tag: string, path = '/externalapi/device/accountList'): Page =>
  ({ id, tag, path, summary: '', params: [], fixedValues: {} });

describe('文档同步', () => {
  it('识别新旧 API 链接，去重，排除说明页与其他站点', () => {
    expect(apiPageIds([
      'https://develop.zhizhuip.com/api-123.md', 'https://develop.zhizhuip.com/456e0.md',
      'https://develop.zhizhuip.com/456e0.md', 'https://develop.zhizhuip.com/789m0.md',
      'https://develop.zhizhuip.com/doc-789.md', 'https://example.test/123e0.md',
    ].join('\n'))).toEqual(['456e0', 'api-123']);
  });

  it('过滤 api 模块和已有正式产品分组的重复页；未知独立页保留并报错', () => {
    const canonical = page('new', '用户IP子账号管理/动态住宅不限流量');
    const unknown = page('unknown', '对外接口', '/externalapi/new/action');
    const selected = externalPages([
      canonical, page('copy', '对外接口'), page('ipapi', 'IPAPI', '/api/route_setting/whiteList'), unknown,
    ]);
    expect(selected).toEqual([canonical, unknown]);
    expect(() => placePages(selected)).toThrow(/未登记的文档分组/);
  });
});
