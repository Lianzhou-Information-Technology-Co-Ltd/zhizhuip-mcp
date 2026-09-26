# 续费静态住宅（原生）时长IP

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/set_meal/renewOrder:
    post:
      summary: 续费静态住宅（原生）时长IP
      deprecated: false
      description: >
        续费静态住宅（原生）时长IP

        注意：content参数是一个数组。对应content[].ids[]也是一个数组。根据国家进行分类组合。一个国家可以有对个id进行续费。可以有很多个国家的ip。
        content参数可见示例：包含了2个国家（US，UK）续费。第一个国家US又有2个ip（id = 8，id = 9）进行续费。
      tags:
        - 用户IP子账号管理/静态住宅（原生）时长子账号
      parameters: []
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                access_token:
                  description: 用户token。用户登录之后，获取token
                  example: '{{access_token}}'
                  type: string
                type:
                  description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：1</b>
                  example: 1
                  type: integer
                status:
                  description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：1</b>
                  example: 1
                  type: integer
                conpon_id:
                  description: >-
                    优惠券id。根据<a href="/api-116480625"
                    target="_blank">查询优惠券列表</a>获取对应的优惠券id
                  example: 4912
                  type: integer
                native:
                  type: integer
                  description: 原生:0=非原生,1=本土原生。<b>此处固定为：1</b>
                  example: 1
                content[0][country]:
                  description: >-
                    产品对应的国家编码，选填。<a target="_blank"
                    href="/api-239401043">静态住宅（原生）对应国家列表</a>可获取国家编码
                  example: US
                  type: string
                content[0][ids][0]:
                  description: 对应产品id
                  example: 2
                  type: integer
                content[0][ids][1]:
                  type: integer
                  description: 对应产品id
                  example: 3
                content[0][timelen]:
                  description: 时长计费类型：0=7天，1=30天，2=90天，3=180天，4=360天
                  example: 1
                  type: integer
                content[0][renew_with_bandwidth]:
                  type: integer
                  description: 是否子账号和带宽一起续费:0=单独续费子账号,1=同时续费子账号和带宽
                  example: 0
                content[1][country]:
                  description: >-
                    产品对应的国家编码，选填。<a target="_blank"
                    href="/api-239401043">静态住宅（原生）对应国家列表</a>可获取国家编码
                  example: UK
                  type: string
                content[1][ids][0]:
                  description: 对应产品id集
                  example: 14
                  type: integer
                content[1][timelen]:
                  description: 时长计费类型：0=7天，1=30天，2=90天，3=180天，4=360天
                  example: 1
                  type: integer
              required:
                - access_token
                - type
                - status
                - native
                - content[0][country]
                - content[0][ids][0]
                - content[0][ids][1]
                - content[0][timelen]
                - content[1][country]
                - content[1][ids][0]
                - content[1][timelen]
            examples: {}
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties:
                  code:
                    type: integer
                    description: 响应编码:1=正常,0=错误
                  msg:
                    type: string
                    description: 响应说明
                  time:
                    type: string
                  data:
                    type: 'null'
                x-apifox-orders:
                  - code
                  - msg
                  - time
                  - data
                required:
                  - code
                  - msg
                  - time
                  - data
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-239401040-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
