# 退单申请（需平台审核）

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
      summary: 退单申请（需平台审核）
      deprecated: false
      description: 获取子账号退单申请，只提交申请，需要平台审核，审核之后进行退款到余额。由于带宽产品资源紧张，退单金额按照实际使用天计算，不足一天算一天金额。
      tags:
        - 用户IP子账号管理/动态住宅不限流量
      parameters: []
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                access_token:
                  description: >-
                    用户api key。<a href="/9518263m0" target="_blank">api
                    key获取方式</a>
                  example: '{{access_token}}'
                  type: string
                product_type_id:
                  type: integer
                  description: 产品id，当前产品固定：11
                  example: 11
                sub_account_id:
                  type: integer
                  description: 子账号id
                  example: 1
                remark:
                  description: 退单原因
                  example: 退单原因
                  type: string
              required:
                - access_token
                - product_type_id
                - sub_account_id
                - remark
            examples: {}
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties: {}
                x-apifox-orders: []
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅不限流量
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-520399289-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
