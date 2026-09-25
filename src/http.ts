import type { CallToolResult } from '@modelcontextprotocol/server';
import { toForm } from './form.js';
import type { ToolDef } from './types.js';

export interface Cfg {
  baseUrl: string;
  token: string;
  timeoutMs: number;
}

export const DEFAULT_BASE_URL = 'https://www.zhizhuip.cc';

export function cfgFromEnv(env: NodeJS.ProcessEnv = process.env): Cfg {
  const token = (env.ZHIZHUIP_TOKEN ?? '').trim();
  if (!token) {
    throw new Error(
      '缺少环境变量 ZHIZHUIP_TOKEN。请到蜘蛛 IP 网站的 API Keys 页面生成一个 API Key（sk- 开头）填进来，做法见 README。' +
        '客户端拉起本服务时不继承终端里的环境变量，token 要写在客户端配置里（如 claude mcp add -e ZHIZHUIP_TOKEN=…），用 Inspector 调试时通过 -e 传入。',
    );
  }
  const baseUrl = (env.ZHIZHUIP_BASE_URL ?? DEFAULT_BASE_URL).trim().replace(/\/+$/, '');
  const timeoutMs = Number(env.ZHIZHUIP_TIMEOUT_MS ?? 30_000);
  if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) throw new Error('ZHIZHUIP_TIMEOUT_MS 必须是正整数（毫秒）');
  return { baseUrl, token, timeoutMs };
}

export const text = (t: string, isError = false): CallToolResult => ({
  content: [{ type: 'text', text: t }],
  ...(isError ? { isError: true } : {}),
});

/**
 * 工具参数 → 真正发给后端的参数：product 展开成 type/status/native/version/is_month 的组合，
 * 再附上固定参数与 is_mcp_send 标记（后端目前不识别这个标记，留给将来区分 MCP 流量）。
 * product 不在表里返回 undefined；正常情况下 SDK 已按枚举拦下，这里只是兜底。
 */
export function expandArgs(tool: ToolDef, args: Record<string, unknown>): Record<string, unknown> | undefined {
  const { product, ...rest } = args;
  const combo = tool.products ? tool.products[String(product)] : undefined;
  if (tool.products && !combo) return undefined;
  return { ...rest, ...combo, ...tool.fixed, is_mcp_send: 1 };
}

type Body = { code?: unknown; msg?: unknown; data?: unknown };

/** 只接受 JSON 对象；非 JSON、null、数组都当格式异常 */
function parseBody(raw: string): Body | undefined {
  try {
    const v: unknown = JSON.parse(raw);
    return v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Body) : undefined;
  } catch {
    return undefined;
  }
}

const pickField = (data: unknown, key: string): unknown =>
  (data && typeof data === 'object' ? (data as Record<string, unknown>)[key] : undefined) ?? null;

export async function callApi(
  tool: ToolDef,
  args: Record<string, unknown>,
  cfg: Cfg,
  fetchImpl: typeof fetch = fetch,
): Promise<CallToolResult> {
  const expanded = expandArgs(tool, args);
  if (!expanded) return text(`product 必须是 ${Object.keys(tool.products ?? {}).join('、')} 之一`, true);
  const form = toForm(expanded).toString();
  const url = new URL(cfg.baseUrl + tool.path);
  const headers: Record<string, string> = { token: cfg.token, accept: 'application/json', 'user-agent': 'zhizhuip mcp' };
  const init: RequestInit = { method: tool.method, headers, signal: AbortSignal.timeout(cfg.timeoutMs) };
  if (tool.method === 'GET') {
    url.search = form;
  } else {
    headers['content-type'] = 'application/x-www-form-urlencoded';
    init.body = form;
  }

  let status: number;
  let raw: string;
  try {
    const res = await fetchImpl(url, init);
    status = res.status;
    raw = await res.text();
  } catch (e) {
    const err = e as Error & { cause?: { message?: string } };
    if (err.name === 'TimeoutError') return text(`请求 ${tool.path} 超过 ${cfg.timeoutMs} ms 未响应`, true);
    const cause = err.cause?.message ? `（${err.cause.message}）` : '';
    return text(`请求 ${tool.path} 失败：${err.message}${cause}`, true);
  }

  const body = parseBody(raw);
  const code = body ? Number(body.code) : NaN;
  if (!body || !Number.isFinite(code)) return text(`HTTP ${status}，响应格式异常：${raw.slice(0, 200)}`, true);

  const msg = String(body.msg ?? '');
  if (code === 1) return text(JSON.stringify({ code, msg, data: tool.pick ? pickField(body.data, tool.pick) : body.data ?? null }));
  if (code === 401 || code === 403 || status === 401) {
    return text(`API Key 无效（${msg}）。请到蜘蛛 IP 网站的 API Keys 页面核对这个 Key 是否还在、复制是否完整，必要时重新生成，更新 ZHIZHUIP_TOKEN 后重启本 MCP。`, true);
  }
  if (msg.includes('访问频繁')) return text(`${msg} 后端限流为每个接口每 IP 30 秒内 300 次（带宽类接口 60 次），请稍后重试。`, true);
  return text(body.data == null ? msg : `${msg}\n${JSON.stringify(body.data)}`, true);
}
