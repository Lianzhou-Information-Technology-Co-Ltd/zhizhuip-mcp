export interface JsonSchema {
  type?: 'string' | 'integer' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  enum?: (string | number)[];
  items?: JsonSchema;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  additionalProperties?: boolean;
}

/** 后端用 type/status/native/version/is_month 的组合标识产品；一个 product 枚举值展开成这样一组参数 */
export type ProductParams = Record<string, number>;

export interface ToolDef {
  name: string;
  title: string;
  description: string;
  readOnly: boolean;
  destructive: boolean;
  method: 'GET' | 'POST';
  path: string;
  /** 每次请求固定附加的参数；只对应一个产品的工具把产品组合放在这里 */
  fixed?: Record<string, string | number>;
  /** 调用方没传时补上的默认值，传了以传的为准；给后端没有默认值的分页参数用 */
  defaults?: Record<string, string | number>;
  /** 带 product 参数的工具：枚举值 → 展开成的后端参数 */
  products?: Record<string, ProductParams>;
  /** 派生工具只返回响应 data 里的这个字段 */
  pick?: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, JsonSchema>;
    required: string[];
    /** 写错的参数名直接被校验拒绝，而不是静默发给后端 */
    additionalProperties: false;
  };
}
