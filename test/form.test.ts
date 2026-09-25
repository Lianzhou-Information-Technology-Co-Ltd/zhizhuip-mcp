import { describe, expect, it } from 'vitest';
import { toForm } from '../src/form.js';

describe('toForm', () => {
  it('对象数组编成 PHP 括号键，数组下标从 0 起', () => {
    const s = toForm({ content: [{ id: '32', customPassword: 'p1' }, { id: '33', customPassword: 'p2' }] }).toString();
    expect(decodeURIComponent(s)).toBe('content[0][id]=32&content[0][customPassword]=p1&content[1][id]=33&content[1][customPassword]=p2');
  });

  it('嵌套数组：content[0][ids][0]', () => {
    const s = toForm({ content: [{ ids: ['77', '76'], country: 'US', timelen: 1 }] }).toString();
    expect(decodeURIComponent(s)).toBe('content[0][ids][0]=77&content[0][ids][1]=76&content[0][country]=US&content[0][timelen]=1');
  });

  it('标量数组、数字与布尔转成字符串，undefined 与 null 跳过', () => {
    const s = toForm({ sub_accounts: ['1', '2'], bandwidth_num: 10, flag: true, skip: undefined, none: null }).toString();
    expect(decodeURIComponent(s)).toBe('sub_accounts[0]=1&sub_accounts[1]=2&bandwidth_num=10&flag=true');
  });

  it('中文与特殊字符按 URL 编码', () => {
    expect(toForm({ remark: '测试 a&b' }).toString()).toBe('remark=%E6%B5%8B%E8%AF%95+a%26b');
  });
});
