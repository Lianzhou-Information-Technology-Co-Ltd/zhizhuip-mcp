import { describe, expect, it, vi } from 'vitest';
import type { ServerContext } from '@modelcontextprotocol/server';
import { ConfirmTokens, TOKEN_QUIET_MS, TOKEN_TTL_MS, preview, withConfirm } from '../src/confirm.js';
import type { ToolDef } from '../src/types.js';

const tool: ToolDef = {
  name: 'sub_account_update_batch',
  title: '批量修改子账号',
  description: '批量修改多个动态住宅子账号的备注或切换周期，ids 为英文逗号连接的子账号 id。',
  readOnly: false,
  destructive: false,
  method: 'POST',
  path: '/externalapi/device/accountUpdateList',
  products: { 'dynamic-no-expiry': { type: 0, status: 0 }, 'dynamic-monthly': { type: 0, status: 0, is_month: 1 } },
  inputSchema: {
    type: 'object',
    properties: {
      product: { type: 'string', enum: ['dynamic-no-expiry', 'dynamic-monthly'], description: '产品：dynamic-no-expiry=动态住宅流量（永久），dynamic-monthly=动态住宅流量（期限）' },
      ids: { type: 'string', description: '子账号 id 集' },
      remark: { type: 'string', description: '备注' },
      content: { type: 'array', items: { type: 'string' } },
    },
    required: ['product', 'ids'],
    additionalProperties: false,
  },
};
const args = { product: 'dynamic-monthly', ids: '12,13', remark: '测试', content: ['a'] };
const ok = { content: [{ type: 'text' as const, text: 'done' }] };
const textOf = (r: unknown): string => (r as { content: { text: string }[] }).content[0].text;

describe('preview', () => {
  it('列出工具、首句说明与全部参数，product 带中文产品名，跳过空值', () => {
    expect(preview(tool, { ...args, remark: undefined }).split('\n')).toEqual([
      '批量修改子账号（sub_account_update_batch）',
      '批量修改多个动态住宅子账号的备注或切换周期，ids 为英文逗号连接的子账号 id',
      '- product：dynamic-monthly（动态住宅流量（期限））',
      '- ids：12,13',
      '- content：["a"]',
    ]);
  });
  it('product 不在描述里时原样显示', () => {
    expect(preview(tool, { product: 'static-ipv6' })).toContain('- product：static-ipv6');
  });
});

describe('ConfirmTokens', () => {
  it('确认码绑定工具与参数，只能用一次，参数顺序不同也算同一组', () => {
    const t = new ConfirmTokens(Date.now, 0);
    const token = t.issue('x', { a: 1, b: [1, 2] });
    expect(t.consume(token, 'x', { b: [1, 2], a: 1 })).toBe('ok');
    expect(t.consume(token, 'x', { a: 1, b: [1, 2] })).toBe('unknown');
  });

  it('发出后静默期内不能用且不消费；提前试一次生效时间就顺延一次', () => {
    let now = 1_000;
    const t = new ConfirmTokens(() => now);
    const token = t.issue('x', { a: 1 });
    expect(t.consume(token, 'x', { a: 1 })).toBe('too_soon');
    now += TOKEN_QUIET_MS - 1;
    expect(t.consume(token, 'x', { a: 1 })).toBe('too_soon');
    now += TOKEN_QUIET_MS - 1;
    expect(t.consume(token, 'x', { a: 1 })).toBe('too_soon');
    now += TOKEN_QUIET_MS;
    expect(t.consume(token, 'x', { a: 1 })).toBe('ok');
    expect(t.consume(token, 'x', { a: 1 })).toBe('unknown');
  });

  it('签发新确认码时顺手清掉已过期的旧码，旧码变成 unknown 而不是一直留着', () => {
    let now = 1_000;
    const t = new ConfirmTokens(() => now, 0);
    const old = t.issue('x', { a: 1 });
    now += TOKEN_TTL_MS + 1;
    t.issue('x', { b: 2 });
    expect(t.consume(old, 'x', { a: 1 })).toBe('unknown');
  });

  it('参数变了或工具变了报 mismatch 并作废；过期报 expired', () => {
    let now = 1_000;
    const t = new ConfirmTokens(() => now, 0);
    expect(t.consume(t.issue('x', { a: 1 }), 'x', { a: 2 })).toBe('mismatch');
    expect(t.consume(t.issue('x', { a: 1 }), 'y', { a: 1 })).toBe('mismatch');
    const token = t.issue('x', { a: 1 });
    now += TOKEN_TTL_MS + 1;
    expect(t.consume(token, 'x', { a: 1 })).toBe('expired');
    expect(t.consume(token, 'x', { a: 1 })).toBe('unknown');
  });
});

describe('withConfirm', () => {
  const ctxWith = (responses?: Record<string, unknown>): ServerContext => ({ mcpReq: { inputResponses: responses } }) as unknown as ServerContext;

  it('客户端支持弹窗：第一次返回 input_required，预览在弹窗文案里；用户同意后才执行', async () => {
    const exec = vi.fn(async () => ok);
    const h = withConfirm(tool, { supportsElicitation: () => true, exec, tokens: new ConfirmTokens(Date.now, 0) });

    const ask = (await h(args, ctxWith())) as { resultType?: string; inputRequests?: Record<string, { params: { message: string } }> };
    expect(ask.resultType).toBe('input_required');
    expect(ask.inputRequests?.confirm.params.message).toContain('批量修改子账号（sub_account_update_batch）');
    expect(ask.inputRequests?.confirm.params.message).toContain('- product：dynamic-monthly（动态住宅流量（期限））');
    expect(exec).not.toHaveBeenCalled();

    expect(await h(args, ctxWith({ confirm: { action: 'accept', content: { confirm: true } } }))).toBe(ok);
    expect(exec).toHaveBeenCalledWith(args);
  });

  it('客户端支持弹窗但没拿到同意（拒绝、取消、没勾选）：退到确认码并说明，带码重调才执行', async () => {
    const exec = vi.fn(async () => ok);
    const h = withConfirm(tool, { supportsElicitation: () => true, exec, tokens: new ConfirmTokens(Date.now, 0) });
    for (const [i, answer] of [{ action: 'decline' }, { action: 'cancel' }, { action: 'accept', content: { confirm: false } }].entries()) {
      const r = await h(args, ctxWith({ confirm: answer }));
      expect(textOf(r)).toContain('弹窗没有得到确认');
      expect(textOf(r)).toContain('待确认');
      expect(exec).toHaveBeenCalledTimes(i);
      const token = textOf(r).match(/confirm_token=([0-9a-f]+)/)?.[1];
      expect(await h({ ...args, confirm_token: token }, ctxWith())).toBe(ok);
      expect(exec).toHaveBeenCalledTimes(i + 1);
    }
  });

  it('客户端不支持弹窗：先给预览和确认码，带码且参数相同才执行，确认码不进后端参数', async () => {
    const exec = vi.fn(async () => ok);
    const h = withConfirm(tool, { supportsElicitation: () => false, exec, tokens: new ConfirmTokens(Date.now, 0) });

    const first = await h(args, ctxWith());
    expect((first as { isError?: boolean }).isError).toBeFalsy();
    expect(textOf(first)).toContain('待确认');
    expect(textOf(first)).toContain('- product：dynamic-monthly（动态住宅流量（期限））');
    const token = textOf(first).match(/confirm_token=([0-9a-f]+)/)?.[1];
    expect(token).toBeTruthy();
    expect(exec).not.toHaveBeenCalled();

    const wrong = await h({ ...args, remark: '改了', confirm_token: token }, ctxWith());
    expect(wrong).toMatchObject({ isError: true });
    expect(textOf(wrong)).toContain('参数与本次不同');

    const again = await h({ ...args, confirm_token: token }, ctxWith());
    expect(again).toMatchObject({ isError: true });
    expect(textOf(again)).toContain('无效或已过期');

    const token2 = textOf(await h(args, ctxWith())).match(/confirm_token=([0-9a-f]+)/)?.[1];
    expect(await h({ ...args, confirm_token: token2 }, ctxWith())).toBe(ok);
    expect(exec).toHaveBeenCalledWith(args);
  });

  it('拿到确认码立刻重调不执行，提示先问用户；等过静默期再带码才执行', async () => {
    let now = 1_000;
    const exec = vi.fn(async () => ok);
    const h = withConfirm(tool, { supportsElicitation: () => false, exec, tokens: new ConfirmTokens(() => now) });
    const token = textOf(await h(args, ctxWith())).match(/confirm_token=([0-9a-f]+)/)?.[1];
    now += 2_000;
    const early = await h({ ...args, confirm_token: token }, ctxWith());
    expect(early).toMatchObject({ isError: true });
    expect(textOf(early)).toContain('确认码还不能用');
    expect(exec).not.toHaveBeenCalled();
    now += TOKEN_QUIET_MS + 1;
    expect(await h({ ...args, confirm_token: token }, ctxWith())).toBe(ok);
  });
});
