# 产品新购

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/product_order/createProductOrder:
    post:
      summary: 产品新购
      deprecated: false
      description: 购买动态住宅不限流量子账号
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
                country:
                  description: 国家编码，目前仅US / DE / SG 3个国家
                  example: US
                  type: string
                timelen:
                  type: integer
                  description: 购买天数，1=30天，2=90天，3=180天
                  example: 1
                bandwidth_num:
                  type: integer
                  description: 带宽 Mbps，整数，最低 10
                  example: 10
                use_random_username:
                  type: integer
                  description: 1=随机生成自定义账密；0=默认系统子账号
                  example: 1
                conpon_id:
                  type: integer
                  description: 优惠券id，有自定义价格无法使用优惠券
                  example: 0
              required:
                - access_token
                - product_type_id
                - country
                - timelen
                - bandwidth_num
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
              example:
                code: 1
                msg: 购买成功
                time: '1789718580'
                data:
                  orderId: 1
                  orderNumber: 20260918160xxxxxxxx
                  origin_price: '450.00'
                  real_price: '450.00'
                  subAccounts:
                    - id: 78
                      sub_account: 10
                      username: xxxxxxxx
                      password: xxxxxxxx
                      country: US
                      bandwidth_num: 10
                      start_time: 1789718580
                      end_time: 1792310580
                      status: 0
                      expire_tag: ''
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅不限流量
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-520399286-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
