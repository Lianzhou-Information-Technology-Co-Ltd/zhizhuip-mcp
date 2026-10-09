# 蜘蛛 IP MCP 使用指南

蜘蛛 IP MCP 可以让 AI 助手连接你的蜘蛛 IP 账号。配置完成后，你可以直接用自然语言查询余额、子账号、流量、价格和库存，也可以在确认后购买产品、续费、升级带宽或管理子账号。

支持动态住宅流量、动态住宅不限流量（带宽）、静态住宅、静态住宅 IPv6 和数据中心产品。不同产品支持的操作有所区别，详见下文。

- [蜘蛛 IP 官网](https://www.zhizhuip.com/)
- [MCP 项目仓库](https://github.com/Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp)
- [API 文档](https://develop.zhizhuip.com/llms.txt)

## 1. 使用前准备

你需要准备：

1. 一个蜘蛛 IP 账号，以及在网站上创建的 API Key。
2. 一个支持本地 **stdio MCP** 的客户端，例如 Claude Desktop、Claude Code、Cursor、Codex 或 VS Code。
3. [Node.js](https://nodejs.org/en/download)，推荐安装 **Node.js 24 LTS**，安装包自带 npm 和 npx。
4. [Git](https://git-scm.com/downloads)，用于从 GitHub 获取项目；电脑需要能够访问 GitHub 和 npm。

安装完成后，重新打开终端，检查以下命令能否显示版本号：

```bash
node --version
npm --version
git --version
```

本项目由 AI 客户端在本机启动，使用 stdio 通信，没有可填写的远程 MCP URL。只有远程 HTTP 接入功能的客户端不能直接使用本项目，也不要把蜘蛛 IP 官网或 API 地址当成 MCP 地址。

## 2. 获取 API Key

1. 登录蜘蛛 IP 网站。
2. 点击右上角头像，进入 **API Keys**；手机端在“我的”中进入。
3. 新建 Key，复制以 `sk-` 开头的完整内容。
4. 将下文配置中的 `YOUR_API_KEY` 替换为这个 Key。

获取入口说明见 [API Key 获取方式](https://develop.zhizhuip.com/9518263m0.md)。

API Key 代表你的账号权限。请保存在自己的客户端配置中，不要发到公开聊天、网页、截图或代码仓库。本文所有 `YOUR_API_KEY` 都是占位符，不能直接用来连接。

## 3. 接入你的 AI 客户端

以下示例使用 npx：客户端首次启动时，会从 GitHub 下载项目、安装依赖并构建，第一次启动可能较慢。之后由客户端负责启动和连接，不需要另开终端一直运行服务。

**只需选择你正在使用的一种客户端配置。** 如果配置文件中已有其他服务，请合并 `zhizhuip` 条目，保留原有内容。保存后重启对应客户端，或重新加载该 MCP 服务。

### Claude Desktop

在 Claude Desktop 设置中打开 **Developer → Edit Config**，编辑 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "zhizhuip": {
      "command": "npx",
      "args": ["-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp"],
      "env": {
        "ZHIZHUIP_TOKEN": "YOUR_API_KEY"
      }
    }
  }
}
```

常见配置文件位置：Windows 为 `%APPDATA%\Claude\claude_desktop_config.json`，macOS 为 `~/Library/Application Support/Claude/claude_desktop_config.json`。保存后完全退出并重新打开客户端。操作入口可参考 [本地 MCP 接入说明](https://modelcontextprotocol.io/docs/develop/connect-local-servers)。

### Cursor

编辑全局配置 `~/.cursor/mcp.json`，加入以下内容。Windows 中 `~` 表示你的用户目录。

```json
{
  "mcpServers": {
    "zhizhuip": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp"],
      "env": {
        "ZHIZHUIP_TOKEN": "YOUR_API_KEY"
      }
    }
  }
}
```

也支持项目内的 `.cursor/mcp.json`；个人 Key 建议放在全局配置中。在对话中使用允许调用工具的模式，并确保该服务已启用。配置位置见 [Cursor MCP 文档](https://cursor.com/docs/mcp)。

### Claude Code

在终端执行以下命令，将服务加入个人配置：

```bash
claude mcp add --scope user --env ZHIZHUIP_TOKEN=YOUR_API_KEY --transport stdio zhizhuip -- npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp
```

重新进入 Claude Code 后，可用 `/mcp` 查看连接状态。参数顺序和配置范围见 [Claude Code MCP 文档](https://code.claude.com/docs/en/mcp)。

### Codex

在 `~/.codex/config.toml` 中加入：

```toml
[mcp_servers.zhizhuip]
command = "npx"
args = ["-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp"]

[mcp_servers.zhizhuip.env]
ZHIZHUIP_TOKEN = "YOUR_API_KEY"
```

如果使用 Codex CLI，也可以用下面的命令添加，两种方式任选一种：

```bash
codex mcp add zhizhuip --env ZHIZHUIP_TOKEN=YOUR_API_KEY -- npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp
```

用 `codex mcp list` 查看配置；进入 CLI 对话后用 `/mcp` 查看连接状态。配置格式见 [Codex MCP 文档](https://developers.openai.com/codex/mcp)。

### VS Code

打开命令面板，执行 **MCP: Open User Configuration**，在打开的 `mcp.json` 中加入：

```json
{
  "servers": {
    "zhizhuip": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp"],
      "env": {
        "ZHIZHUIP_TOKEN": "YOUR_API_KEY"
      }
    }
  }
}
```

这个配置文件的顶层字段是 `servers`。保存后启动该服务，在聊天工具列表中启用它。VS Code 也支持其他配置位置，详见 [VS Code MCP 文档](https://code.visualstudio.com/docs/agent-customization/mcp-servers)。

### Windows 提示找不到 npx 时

把上述 JSON 配置里的 `command` 改为 `cmd`，并在参数开头加入 `/c` 和 `npx`。例如 Claude Desktop 的完整配置为：

```json
{
  "mcpServers": {
    "zhizhuip": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp"],
      "env": {
        "ZHIZHUIP_TOKEN": "YOUR_API_KEY"
      }
    }
  }
}
```

其他客户端保留各自的顶层结构，只替换 `command` 和 `args`。Codex TOML 同样改为 `command = "cmd"`，并使用上面的参数数组。

使用 CLI 添加时，将命令中 `-- npx -y` 改为 `-- cmd /c npx -y`。

### 其他支持 stdio 的客户端

在客户端的 MCP 设置中填写：

| 设置项 | 内容 |
| --- | --- |
| 服务名称 | `zhizhuip` |
| 通信方式 | `stdio` |
| 启动命令 | `npx` |
| 参数 | `-y`、`github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp`，按两个参数填写 |
| 环境变量 | 名称 `ZHIZHUIP_TOKEN`，值为你的 API Key |

也可以执行以下命令，打印各客户端的配置片段，再替换其中的 Key：

```bash
npx -y github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp setup --npx --token YOUR_API_KEY
```

`setup` 只输出配置文本，不会替你修改客户端设置。Key 应通过客户端的环境变量配置传入，不要只在另一个终端里设置环境变量。

## 4. 确认连接成功

配置完成后，在 AI 对话中发送：

> 使用蜘蛛 IP 工具查询我的账号余额。

如果助手调用了 `user_balance` 并返回余额，说明客户端、API Key 和接口连接已正常工作。安装和查询余额本身不会购买产品。

当前版本默认提供 **44 个工具**，其中 **21 个查询工具、23 个写操作工具**。只读模式提供 21 个查询工具。客户端可能折叠工具列表，以服务连接状态和实际查询结果为准。

## 5. 用自然语言操作

不需要记住工具名或手写 API 参数。把产品类型、国家、数量、时长和目标子账号说清楚，助手会选择相应工具；信息不足时应先补充信息。

### 查询账号与资源

> 查询我的余额和可用优惠券。

> 列出我的静态住宅原生子账号，显示国家、IP 和到期时间。

> 查看动态住宅永久流量子账号最近 7 天的用量，按使用量排序。

> 查询美国静态住宅原生 IP 的库存和我的购买价格，先不要下单。

> 列出我的动态不限流量带宽子账号，显示带宽、到期时间以及能否续费、升级。

查询子账号流量时，单次日期范围最多 30 天，结束日期不能晚于今天。列表有分页，查询“全部”时可让助手继续翻页。

### 购买与续费

> 我想购买 10 GB 动态住宅永久流量。先查询我的价格和优惠券，列出购买方案，等我确认再下单。

> 我需要 5 个美国静态住宅原生 IP，使用 30 天、SOCKS5 协议。先查询库存和价格，再让我确认。

> 帮我检查选中的静态住宅子账号能否续费 30 天，列出账号和费用，等我确认。

> 为我购买一个美国入口的动态不限流量带宽子账号，10 Mbps、30 天。先列出参数，并提醒我去网站核实费用，等我确认。

购买、续费和带宽升级会按后端规则扣除账号余额。部分操作要求账号先完成验证或实名；遇到提示时，先在网站完成相应步骤。“购买测试 IP”也会扣费并占用测试额度，不是免费试用。

### 管理子账号

> 将这个动态住宅永久流量子账号的备注改为“项目 A”，先展示将修改的账号。

> 为选中的动态住宅流量子账号设置每日流量上限，先让我确认数值和目标账号。

> 删除我指定的两个动态住宅流量子账号，先列出账号和影响，等我确认。

修改、删除会改变真实账号数据；删除子账号不可恢复。请先核对目标，支持的操作以产品类型为准。

### 动态不限流量（带宽）

此产品与按 GB 购买的动态住宅流量不同，当前支持查询子账号、新购、续费、升级带宽和申请退单。

- 新购一次创建一个子账号；入口支持美国 `US`、德国 `DE`、新加坡 `SG`。
- 带宽单位为 Mbps，最低 10 Mbps；购买和续费时长支持 30、90、180 天。
- 升级时填写升级后的总带宽，例如从 10 Mbps 升到 20 Mbps，应指定“升级到 20 Mbps”。
- 续费和升级前，应先查询账号是否可操作。续费、升级和退单需要的账号标识来自列表的 `sub_account` 字段，助手应使用该值，不要混用同一行的 `id`。
- 当前 MCP 的价格查询工具不含该产品报价，也没有该产品的库存查询工具。请先在网站核实费用和优惠券，再确认扣费操作，最终扣款以接口结果为准。
- 该产品的列表接口只支持分页；其他产品的搜索、改密、备注和流量限制工具不适用于它。

可以这样说：

> 检查这个动态不限流量带宽子账号是否可以续费 90 天，先展示账号和续费时长，费用由我在网站核实后再确认。

> 检查这个动态不限流量带宽子账号是否可以从 10 Mbps 升级到 20 Mbps，先展示操作内容，等我确认。

> 为这个动态不限流量带宽子账号申请退单，原因是业务结束。先检查当前状态，并说明这是提交审核申请，等我确认。

退单申请需要平台审核，提交成功不代表已退款；审核期间账号仍可使用。请在网站查看审核及退款结果，不要重复提交。

### 不同产品支持哪些操作

| 产品 | 常用功能 |
| --- | --- |
| 动态住宅流量（永久、期限） | 购买流量、查询套餐和用量、新建及删除子账号、修改备注和切换间隔、设置流量上限、查询白名单 |
| 动态住宅不限流量（带宽） | 查询子账号、新购、续费、升级带宽、申请退单 |
| 静态住宅（非原生、原生、运营商原生） | 查询子账号和库存、购买、续费、管理账密、切换端口连接、查询及升级带宽、申请退单、预约 IP |
| 静态住宅 IPv6 | 查询子账号、购买、续费、自定义账密 |
| 数据中心 | 查询子账号、购买、续费、管理账密、预约 IP |

实际可购地区、库存、价格和操作资格，以接口返回及网站规则为准。

## 6. 操作确认与只读模式

### 写操作怎样确认

默认配置下，购买、续费、升级、修改、删除、退单等写操作执行前，会先展示操作预览：

- 客户端支持确认弹窗时，在弹窗中核对并确认。
- 没有弹窗，或弹窗未完成确认时，助手会在对话中转述预览，再询问你是否执行。你可以直接回复“确认”或“取消”，无需手动复制确认码。

对话确认码有效期为 5 分钟，只能使用一次；默认生成后至少等待 10 秒才能执行，提前重试会延后可用时间。超时或修改参数后，需要重新预览并确认。

**操作预览只展示动作和参数，不会自动查询价格或余额。** 涉及扣费时，应先核实费用，再确认执行。客户端自身也可能要求一次工具授权，这是另一层权限确认。

### 只查询，不开放写操作

如果只需要查询，在启动参数末尾加入 `--readonly`。例如将 npx 配置的 `args` 改为：

```json
["-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp", "--readonly"]
```

Windows 使用 `cmd` 时改为：

```json
["/c", "npx", "-y", "github:Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp", "--readonly"]
```

重启服务后，购买、续费、修改、删除等工具不会加载。需要恢复这些操作时，移除 `--readonly` 并重启。

`--yes` 会关闭本项目的写操作确认，让写操作直接执行。日常对话建议保留默认确认机制。

## 7. 本地安装与更新

如果希望自行管理安装目录和版本，可以克隆仓库：

```bash
git clone https://github.com/Lianzhou-Information-Technology-Co-Ltd/zhizhuip-mcp.git
cd zhizhuip-mcp
npm ci
```

`npm ci` 会自动构建。完成后，将客户端配置中的启动命令改为 `node`，参数改为本地 `dist/src/index.js` 的**绝对路径**。例如安装在 `C:/tools/zhizhuip-mcp` 时：

```json
{
  "mcpServers": {
    "zhizhuip": {
      "command": "node",
      "args": ["C:/tools/zhizhuip-mcp/dist/src/index.js"],
      "env": {
        "ZHIZHUIP_TOKEN": "YOUR_API_KEY"
      }
    }
  }
}
```

请按自己的实际安装目录修改路径；macOS、Linux 同样使用绝对路径。Windows 的 JSON 路径可使用正斜杠 `/`。只读模式仍然在 `args` 末尾加 `"--readonly"`。

也可以在项目目录执行下列命令，生成适合本地安装的客户端配置：

```bash
node dist/src/index.js setup --token YOUR_API_KEY
```

更新本地安装时，在项目目录执行：

```bash
git pull
npm ci
```

完成后重新启动客户端中的 MCP 服务。npx 安装可能复用缓存；如需明确管理更新版本，可以改用上述本地安装方式。

## 8. 常见问题

| 问题 | 处理方法 |
| --- | --- |
| 提示缺少 `ZHIZHUIP_TOKEN` | 检查 Key 是否写在所用客户端的 `env` 配置中，保存后重启服务。仅在其他终端设置环境变量通常不够。 |
| 提示 API Key 无效或已删除 | 确认复制了完整 Key、没有多余空格，并检查网站上的 Key 是否仍有效；必要时重新创建并更新配置。 |
| 提示找不到 `node`、`npx` 或 `git` | 安装 Node.js 和 Git 后重启客户端；在终端检查版本号。Windows 的 npx 问题可使用上文 `cmd /c npx` 配置。 |
| 首次启动很久没有连接成功 | 首次需要下载和构建，检查 GitHub、npm 网络以及客户端日志。若启动超时，可先执行本文的 `setup --npx` 命令完成下载，再重新加载服务，或改用本地安装。 |
| 助手只给建议，没有调用工具 | 确认 `zhizhuip` 已连接、工具已启用，并在支持工具的对话模式中明确要求“使用蜘蛛 IP 工具”。 |
| 找不到购买、续费等工具 | 检查是否配置了 `--readonly`，或客户端禁用了相关工具；更改后重新加载服务。 |
| 找不到动态不限流量带宽功能 | 确认正在运行包含该产品的项目版本；本地安装执行更新并重启，npx 安装注意缓存。 |
| 动态带宽查不到价格或库存 | 当前 MCP 没有该产品的报价、库存查询能力，请在网站核实，不要沿用其他产品的价格。 |
| 已回复确认，仍提示暂时不能执行 | 确认码有默认 10 秒等待时间，按返回提示等待后再继续；超过 5 分钟则重新发起预览。 |
| 提示余额不足、需要实名或参数不支持 | 根据接口提示在网站充值、完成验证，或调整产品参数后重新确认。 |
| 提示访问频繁 | 暂停连续调用，稍后重试，避免让助手高频轮询。 |
| 扣费操作超时，是否可以直接重试 | 超时不代表操作失败。先在网站检查订单、余额和子账号状态，确认结果后再决定，避免重复购买或续费。 |
| 能否直接接入只接受远程 URL 的网页客户端 | 不能直接接入。本项目是本地 stdio 服务，请使用支持该方式的客户端。 |
