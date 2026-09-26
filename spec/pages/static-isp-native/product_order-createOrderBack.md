# 静态住宅（运营商原生）时长子账号申请退单

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/product_order/createOrderBack:
    post:
      summary: 静态住宅（运营商原生）时长子账号申请退单
      deprecated: false
      description: 静态住宅（运营商原生）时长子账号申请退单。下单 1 天内、未续费、无进行中的带宽升级单、消费记录未开票
      tags:
        - 用户IP子账号管理/静态住宅（运营商原生）时长子账号
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
                  description: 类型：1=全球静态住宅，2=全球数据中心。<b>此处固定为：1</b>
                  example: 1
                  type: integer
                remark:
                  type: string
                  description: 退单备注
                  example: test
                id:
                  description: 子账号id
                  example: 53
                  type: integer
              required:
                - access_token
                - type
                - remark
                - id
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
                    type: object
                    properties:
                      subAccount:
                        type: string
                      username:
                        type: string
                    required:
                      - subAccount
                      - username
                    x-apifox-orders:
                      - subAccount
                      - username
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
      x-apifox-folder: 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-494467044-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
