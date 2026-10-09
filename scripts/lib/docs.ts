import type { Page } from './merge.js';

export function apiPageIds(llms: string): string[] {
  return [...new Set([...llms.matchAll(/https:\/\/develop\.zhizhuip\.com\/(api-\d+|\d+e0)\.md/g)].map(m => m[1]))].sort();
}

export function externalPages(pages: Page[]): Page[] {
  return pages.filter(p => p.path.startsWith('/externalapi/') && !(
    // 同一接口重复挂到未区分产品的分组时，以正式产品分组的页面为准。
    p.tag === '对外接口' && pages.some(other => other.path === p.path && other.tag.startsWith('用户IP子账号管理/'))
  ));
}
