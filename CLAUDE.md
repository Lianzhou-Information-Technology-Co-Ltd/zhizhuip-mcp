# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目是什么

蜘蛛 IP（zhizhuip.com）对外 HTTP 接口 `externalapi` 的 MCP 服务器。TypeScript，官方 MCP SDK v2（`@modelcontextprotocol/server` 2.x），仅 stdio。不带参数暴露全部 40 个工具（含下单扣费与删除），`--readonly` 只暴露 21 个只读工具；19 个写操作工具执行前先向用户确认（`src/confirm.ts`），`--yes` 关闭确认；`setup` 子命令打印各客户端的配置片段，不写文件。参数业务校验、鉴权、扣费都在 PHP 后端，本项目只是 HTTP 客户端，不改后端。面向其他使用者，环境要求与命令示例不以某台开发机为准。

## 常用命令

- `npm ci`：安装并自动构建（`prepare` 跑 `tsc`，输出到 `dist/`）。
- `npm test`：构建 + 全部测试。不联网，端到端测试起本地假后端。
- `npx vitest run test/http.test.ts`：跑单个测试文件；`npx vitest run test/spec.test.ts -u` 更新快照。
- `npm run build-spec`：用本地 `spec/pages/` 重新生成 `spec/tools.json`，不联网。
- `npm run sync-docs`：联网重新下载文档站全部接口页到 `spec/pages/`，随后自动 build-spec 并打印与上一版的差异。
- 本机若装了 RTK hook，`npx vitest` 的输出会被改写成看不到结果，改用 `rtk proxy npm test` 或 `rtk proxy npx vitest run …`。
- 运行：`node dist/src/index.js [--readonly] [--yes]`。环境变量 `ZHIZHUIP_TOKEN`（必填）、`ZHIZHUIP_BASE_URL`（默认线上 `https://www.zhizhuip.cc`）、`ZHIZHUIP_TIMEOUT_MS`、`ZHIZHUIP_CONFIRM_QUIET_MS`（确认码静默期，默认 10000，端到端测试设 0）。
- 配置片段：`node dist/src/index.js setup --token xxx [--readonly] [--npx]`，生成逻辑在 `src/setup.ts`（纯文本函数，有单测）。默认按本机路径生成，`--npx` 生成 `npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp`；仓库地址变了只改 `src/setup.ts` 的 `PACKAGE` 和 `package.json` 的 `repository`。
- 调试：`npx @modelcontextprotocol/inspector -e ZHIZHUIP_TOKEN=xxx -- node dist/src/index.js`。客户端拉起子进程时不继承终端环境变量，token 只能通过客户端配置或 Inspector 的 `-e` 传入。

## 架构：两条链路

开发期（生成链路）：文档站 `llms.txt` → `scripts/sync-docs.ts` 下载 110 个 `/externalapi/` 接口页（每页一个 OpenAPI 3.0.1 YAML 块；路径在 `/api/` 下的 10 页 IPAPI 白名单跳过），按文档站分组存成 `spec/pages/<产品目录>/<控制器>-<方法>.md`，目录名就是 product 枚举值（`dynamic-no-expiry`、`dynamic-monthly`、`static-standard`、`static-native`、`static-isp-native`、`static-ipv6`、`datacenter`），无产品分组是 `tool/`、`user/` → `scripts/lib/merge.ts` 按接口路径合并各产品页、应用 `spec/overrides.yaml` → `scripts/build-spec.ts` 写出 `spec/tools.json`。原始页和生成物都提交入库，`spec/pages/` 同时是快照测试的输入；目录与文件名由 `placePages()` 决定，不要手动改名，`test/spec.test.ts` 会校验。

产品机制是本项目的核心差异：后端用 `type/status/native/version/is_month` 的组合标识产品，文档站按产品分组各写一页。生成时页面的产品由分组决定（产品表 `PRODUCTS` 在 `merge.ts`），这五个参数不进工具 schema，换成一个必填的 `product` 枚举（只列该路径有页的产品），展开表写进工具条目的 `products`；只对应一个产品的路径不出 `product`，组合写进 `fixed`。页面里"此处固定为 N"只用来与产品表交叉核对，对不上打印警告，由 overrides 的 `products` 显式指定。无产品分组（优惠券、价格、账号信息）的参数照文档保留。

运行期：`src/index.ts` 只读 `spec/tools.json`，用 `fromJsonSchema()` 把每个工具的 JSON Schema 原样注册给 SDK，SDK 用内置 Ajv 在调用前校验（所有对象都 `additionalProperties: false`，写错参数名会被拒绝而不是发给后端）。`src/http.ts` 先把 `product` 展开成后端参数（`expandArgs`），经 `src/form.ts` 编成 `application/x-www-form-urlencoded`（PHP 括号格式 `content[0][ids][0]=…`），只读工具 GET、其余 POST，每个请求附带参数 `is_mcp_send=1` 和请求头 `User-Agent: zhizhuip mcp`（后端目前不识别，留给将来区分 MCP 流量），并固定带 `Accept-Language: zh-CN`（不带时运行时默认发 `*`，后端按语言头切换语言时解析失败，所有接口返回空的 HTTP 500），再把后端 `{code,msg,time,data}` 映射成 MCP 结果。`--readonly` 就是按 `readOnly` 过滤同一份工具表。运行期不 import zod、不解析 YAML、不联网拉文档。

写操作确认（`src/confirm.ts`）：非只读工具的处理器被 `withConfirm` 包一层。客户端声明了 elicitation 能力（2025 版协议看连接初始化时的能力，2026 版看每个请求信封里的 `CLIENT_CAPABILITIES_META_KEY`）就返回 `inputRequired(...)` 让客户端弹出操作预览，用户点确认后 SDK 重入处理器，从 `ctx.mcpReq.inputResponses` 读到 accept 且 confirm=true 才调后端；弹窗没拿到同意（decline、cancel、未勾选）和不支持弹窗的客户端都退到确认码：返回预览和一次性 `confirm_token`（绑定工具与参数、5 分钟有效），模型转述给用户后带码重调。弹窗的拒绝不直接当取消，是因为有的客户端声明支持 elicitation 却不显示弹窗就回 decline。带了 `confirm_token` 的调用不再弹窗，直接校验确认码。确认码发出后有静默期（默认 10 秒）：模型拿到码不问用户就重调会收到"还不能用"且不消费、生效时间顺延。写工具的 schema 在注册时多一个可选 `confirm_token`，`spec/tools.json` 本身不含它。预览文案由 `preview()` 从工具标题、描述首句和参数拼出，`product` 显示中文标签，不查价、不查余额。

## 改工具定义的正确姿势

不要手改 `spec/tools.json`。工具名、中文描述、只读与破坏性标注、产品列表、拆分、参数类型/描述/枚举/必填的修正都在 `spec/overrides.yaml`，按接口路径做 key；改完 `npm run build-spec`，再 `npm test`，快照变化合理就 `-u`。`test/spec.test.ts` 会校验 `tools.json` 与当前生成结果一致，忘了重生成会红。同一接口只取 data 里一个字段的派生工具（如 `user_balance` 取 `user_info` 的 `money`）写在 overrides 顶层 `derived`，生成时从来源工具复制并带上 `pick`，运行期 `callApi` 只返回该字段。

合并规则要点（细节见 `docs/2026-09-25-设计方案.md` 第 3 节）：同路径各页参数取并集；顶层参数要在全部变体页都必填才必填，部分必填按产品名写进描述；同一参数各页描述不同时取最长的一条，多产品共用的参数（如购买接口的 `country`）要在 overrides 里给通用描述；`access_token` 一律剔除（鉴权只走请求头 token）；子账号 id 类参数（id、ids、subAccount、subAccounts、account、accounts、sub_accounts，含嵌套）一律 string；`content[0][ids][0]` 转对象数组里的字符串数组，`sub_accounts[]` 转数组；描述去掉 HTML 标签。文档站新增接口会让生成失败并列出路径，把它加进 overrides 或 `ignore`。文档缺陷的兜底条目在 overrides 里带"文档缺陷兜底"注释，并登记到设计文档第 11 节，文档站修好后删除。

## 后端事实（已对照 ip-proxy 源码核实，2026-09-25）

- token 是网站 API Keys 页面生成的 API Key（`sk-` + 32 位十六进制，永久有效），放请求头 `token`。成功 `{code:1,…}`；业务错误 HTTP 200 `{code:0,msg}`；Key 无效或账号停用 HTTP 401 `{code:401,msg:"API Key 无效或已删除"}`；限流 `{code:0,msg:"访问频繁,请稍后再试!"}`，每接口每 IP 30 秒内 300 次，带宽类接口 60 次。
- 所有控制器用 `request->param()` 取参，GET 和 POST 都收，所以文档里的 PUT/DELETE 一律发 POST；只有子账号列表有几个参数只从 query 读，所以只读工具必须走 GET。
- 购买接口后端校验：`num` 1 到 300，数据中心单笔不超过 50 个且不支持 7 天档；下单前要求账号已完成邮箱或手机验证与实名验证；`agree` 默认 SOCKS5，`country` 默认 US；5 秒内相同参数重复请求被拒。续费一次最多 200 个子账号，不回写自动续费设置。预约 IP 只登记需求并给管理员建待办，不扣费。
- 子账号流量查询日期区间最多 30 天，结束日期不晚于今天。IP 段库存的分页参数后端就叫 `pageSize`。

## 规则

- stdout 是 MCP 协议通道，日志只用 `console.error`。token 不进日志、不进返回给模型的错误文本。
- 写操作的确认层不能绕过：新增写工具自动带确认；测试里要直接打假后端就连 `--yes` 或在客户端声明 elicitation 并自动同意。
- 自动化测试不打线上。新增子账号、下单、续费、退单、删除等会在后端创建或删除数据的操作，只由维护者用测试账号手动验证，Claude 不代跑；只读工具和 `sub_account_update` 改备注可以联调。清单在 `docs/2026-09-25-联调记录.md`。
- 代码、注释、文档里不出现其他公司或产品的名字、域名、环境变量。
- 注释只写后来者不查资料就能懂的"为什么"，不复述库函数行为、协议版本或 SDK 内部术语；仓库没有 eslint，不写 eslint 指令。
- 不自行 git commit，改完列出改动由维护者提交。

## 文档

`docs/2026-09-25-设计方案.md` 是规格，`docs/2026-09-25-实施计划.md` 是实施计划，`docs/2026-09-25-联调记录.md` 是联调清单与结果。
