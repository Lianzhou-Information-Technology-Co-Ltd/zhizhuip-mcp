# zhizhuip-mcp

蜘蛛 IP（zhizhuip.com）对外 API 的 MCP 服务器。让 Claude Code、Claude Desktop 等 MCP 客户端可以查询子账号、流量、价格、库存，并在你确认后下单、续费、改配置。

默认暴露全部 41 个工具，含下单扣费、续费、删除子账号；加 `--readonly` 只暴露 21 个只读工具，装了不会产生任何费用。20 个写操作执行前都会先向你确认（见下文"写操作确认"）：支持弹窗的客户端由你点确认，其它客户端由助手转述后再向你确认；不需要写操作的人直接配 `--readonly`。

业务逻辑、参数校验、鉴权、扣费全部在后端完成，本项目只是一个 HTTP 客户端。

## 环境要求

Node.js 20 或更新（推荐当前 LTS），Windows、macOS、Linux 均可。用方式一（npx）还要求本机装有 `git` 并能访问 GitHub。

## 获取 token

token 就是网站的 API Key，永久有效，每个账号最多 20 个：

1. 登录蜘蛛 IP 网站，点右上角头像，进 API Keys（手机端在"我的"里）。
2. 新建一个 Key，复制形如 `sk-…` 的完整字符串（35 位）。
3. 填到下文配置里的 `ZHIZHUIP_TOKEN`。

Key 被删除或复制不完整时，工具会返回"API Key 无效"，到 API Keys 页面核对或重新生成后更新配置即可。Key 等同于账号权限，不要分享给他人或写进客户端代码。

## 安装

两种方式任选一种。

### 方式一：npx，不用下载安装（推荐）

客户端配置里把启动命令写成 `npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp`。客户端第一次拉起时自动从 GitHub 取源码、装依赖、编译并缓存，之后直接复用；第一次会慢一两分钟。

先跑一条命令把所有客户端的配置片段打印出来，贴进你用的那个即可（只打印，不改任何文件）：

```bash
npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp setup --npx --token 你的token
npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp setup --npx --token 你的token --readonly   # 只读版
```

两个最常用的示例。Claude Code：

```bash
claude mcp add -s user -e ZHIZHUIP_TOKEN=你的token zhizhuip -- npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp
```

Claude Desktop 的 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "zhizhuip": {
      "command": "npx",
      "args": ["-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp"],
      "env": { "ZHIZHUIP_TOKEN": "你的token" }
    }
  }
}
```

只读版在 `args` 末尾加 `"--readonly"`。Windows 下若客户端报找不到 npx，把 `command` 改成 `cmd`，`args` 最前面加 `"/c", "npx"`。

### 方式二：克隆仓库，本地构建

```bash
git clone https://github.com/Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp.git
cd zhizhuip-mcp
npm ci
```

`npm ci` 结束时会自动编译到 `dist/`。启动命令是 `node <安装目录>/dist/src/index.js`，只读加 `--readonly`，自动化脚本加 `--yes` 跳过写操作确认。配置片段同样用 setup 打印：

```bash
node <安装目录>/dist/src/index.js setup --token 你的token
```

Claude Code（`<安装目录>` 换成实际路径，Windows 也用正斜杠，例如 `C:/tools/zhizhuip-mcp`）：

```bash
claude mcp add -s user -e ZHIZHUIP_TOKEN=你的token zhizhuip -- node <安装目录>/dist/src/index.js
```

## 配置

环境变量：

| 变量 | 必填 | 默认值 | 说明 |
|---|---|---|---|
| `ZHIZHUIP_TOKEN` | 是 | 无 | 网站 API Keys 页面生成的 API Key |
| `ZHIZHUIP_BASE_URL` | 否 | `https://www.zhizhuip.cc` | 指向测试环境时修改 |
| `ZHIZHUIP_TIMEOUT_MS` | 否 | `30000` | 单次请求超时（毫秒） |
| `ZHIZHUIP_CONFIRM_QUIET_MS` | 否 | `10000` | 确认码发出后多久才能用（毫秒），见下文"写操作确认" |

setup 的输出按客户端分段：Claude Code 与 Codex CLI 各一条可直接执行的命令，Claude Desktop、Cursor、Windsurf/Devin、VS Code、Zed 各给配置文件位置和 JSON 或 TOML 片段，最后一段是任何支持 stdio 的客户端都能用的标准 `mcpServers` JSON。

注意：服务是被客户端当子进程拉起的，只继承一小份白名单环境变量，你在终端里 `export` 或 `$env:` 设置的 `ZHIZHUIP_TOKEN` 传不进去，token 必须写在客户端配置里。

## 写操作确认

新增、修改、下单、续费、升级、退单、预约、删除这 20 个工具执行前都会先向你确认：

- 客户端支持 MCP 的弹窗确认（elicitation）时，会弹出操作预览（工具、参数、产品名），你点确认后才请求后端。弹窗没得到确认（你点了拒绝或关掉，或者客户端声明支持却没显示弹窗）都会退到下面的确认码方式，由助手在对话里再向你确认一次，你不同意就不执行。
- 客户端不支持时，第一次调用只返回预览和一个 5 分钟有效、只能用一次的确认码，AI 要把预览告诉你，你同意后它再带确认码用同样参数调一次。
- 确认码发出后 10 秒内不能用，提前用一次生效时间就顺延一次：AI 拿到确认码不问你就直接重调会被拒；你看完预览再回复通常超过 10 秒，不受影响。每一次操作都单独确认。间隔可用 `ZHIZHUIP_CONFIRM_QUIET_MS` 调整。
- 这层确认与客户端自带的工具权限弹窗是叠加的，可能问两次。
- 自动化脚本不想被打断，启动参数加 `--yes`，写操作直接执行。`--readonly` 模式没有写工具，不涉及确认。

## 调试

不接客户端、想直接看工具列表或手动调一个工具，用官方 Inspector，token 同样要通过它的 `-e` 传入：

```bash
npx @modelcontextprotocol/inspector -e ZHIZHUIP_TOKEN=你的token -- node <安装目录>/dist/src/index.js
```

## 工具清单

产品用 `product` 参数指定：`dynamic-no-expiry` 动态住宅流量（永久）、`dynamic-monthly` 动态住宅流量（期限）、`static-standard` 静态住宅（非原生）、`static-native` 静态住宅（原生）、`static-isp-native` 静态住宅（运营商原生）、`static-ipv6` 静态住宅（IPv6）、`datacenter` 数据中心。每个工具只列它支持的产品；只对应一种产品的工具没有这个参数。国家一律用 ISO 3166-1 二字码（如 `US`），只有预约 IP 填国家名称。

只读（`--readonly` 模式暴露的全部工具）：

| 工具 | 说明 |
|---|---|
| user_info / user_balance | 账号信息与余额 / 只返回余额 |
| user_price / official_price | 当前账号价格 / 官网价格 |
| coupon_list | 优惠券列表 |
| country_list / state_list / city_list | 国家、州省、城市 |
| provider_list | 动态住宅可用供应商（资源池） |
| sub_account_list | 子账号列表，覆盖全部产品 |
| flow_package_list | 已购流量套餐记录 |
| main_account_switch_token | 动态住宅主账号切换 token |
| sub_account_flow / main_account_flow | 子账号、主账号流量 |
| sub_account_limit_flow / sub_account_limit_flow_batch | 子账号流量上限配置 |
| sub_account_whitelist | 子账号 IP 白名单 |
| bandwidth_package_list / bandwidth_detail / bandwidth_trend | 带宽套餐、详情、趋势 |
| ip_range_status | 静态住宅 IP 段库存状态 |

写操作（默认模式才有，`--readonly` 不暴露）：

| 工具 | 说明 |
|---|---|
| sub_account_add | 新增动态子账号 |
| sub_account_update / sub_account_update_batch | 修改备注、切换间隔 |
| sub_account_set_credentials / sub_account_set_password_batch | 自定义账密 / 批量改密码 |
| sub_account_toggle_port | 批量开关端口连接 |
| sub_account_set_limit_flow / sub_account_set_limit_flow_batch | 设置流量上限 |
| sub_account_set_whitelist | 设置子账号 IP 白名单 |
| sub_account_delete / sub_account_delete_batch | 删除子账号，不可恢复 |
| order_buy_dynamic | 购买动态住宅流量，扣费 |
| order_buy_time_ip / order_buy_ipv6 | 购买时长 IP、IPv6 时长 IP，扣费 |
| order_buy_test_ip | 购买测试 IP，消耗测试额度 |
| order_renew / order_renew_ipv6 | 续费，扣费 |
| order_bandwidth_upgrade | 带宽升级，扣费 |
| order_refund_apply | 申请退单 |
| ip_booking | 预约 IP，不扣费 |

资源 `zhizhuip://docs/dynamic-proxy-session`：动态住宅代理连接串的参数写法与示例。

工具的参数、类型与必填项由文档站生成，调用时 SDK 会先按 JSON Schema 校验，不符合的参数直接返回错误，不会打到后端。

## 跟随文档站更新

工具定义由 <https://develop.zhizhuip.com/llms.txt> 生成，不手写：

```bash
npm run sync-docs   # 下载全部接口页到 spec/pages/，重新生成 spec/tools.json，打印与上一版的差异
npm test            # 若快照变化且差异合理：npx vitest run -u 更新快照
```

新增接口会让生成失败并列出路径，把它加进 `spec/overrides.yaml`（或 `ignore`）再跑一次。工具名、中文描述、标注、产品列表与文档缺陷的修正都在 `spec/overrides.yaml`。

## 开发

```bash
npm test               # 构建 + 全部测试（不联网，端到端测试用本地假后端）
npm run build-spec     # 只用本地 spec/pages 重新生成 tools.json（不联网）
```

涉及在后端创建数据的操作（新增子账号、下单、续费等）不做自动化联调，由维护者用测试账号手动验证。设计与实施文档见 `docs/`。

## 许可

MIT，见 `LICENSE`。
