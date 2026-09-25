/** 把嵌套参数编成 PHP 能解析的表单键：content[0][ids][0]=77、accounts[1][limit_flow]=10 */
export function toForm(data: Record<string, unknown>): URLSearchParams {
  const out = new URLSearchParams();
  const put = (key: string, value: unknown): void => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item, i) => put(`${key}[${i}]`, item));
    } else if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) put(`${key}[${k}]`, v);
    } else {
      out.append(key, String(value));
    }
  };
  for (const [k, v] of Object.entries(data)) put(k, v);
  return out;
}
