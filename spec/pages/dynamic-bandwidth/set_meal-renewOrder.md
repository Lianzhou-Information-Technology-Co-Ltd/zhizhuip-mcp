# 产品续费

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
      summary: 产品续费
      deprecated: false
      description: 续费动态住宅不限流量子账号
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
                  description: 子账号
                  example: 1
                timelen:
                  type: integer
                  description: 购买天数，1=30天，2=90天，3=180天
                  example: 1
                conpon_id:
                  type: integer
                  description: 优惠券id，有自定义价格无法使用优惠券
                  example: 0
              required:
                - access_token
                - product_type_id
                - sub_account_id
                - timelen
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
                msg: 续费成功！
                time: '1789718606'
                data:
                  orderId: 1
                  orderNumber: 2026091816xxxxxx
                  origin_price: '1.00'
                  real_price: '1.00'
                  subAccount:
                    id: 1
                    sub_account: 1
                    username: xxxxxx
                    password: xxxxxx
                    country: US
                    bandwidth_num: 10
                    start_time: 1789712799
                    end_time: 1818224799
                    status: 0
                    expire_tag: ''
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅不限流量
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-520399287-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
