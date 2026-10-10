# 带宽升级

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/product_order/dynamicBandwidthUpgradeOrder:
    post:
      summary: 带宽升级
      deprecated: false
      description: 动态住宅不限流量子账号带宽升级
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
                sub_account_id:
                  type: integer
                  description: 子账号
                  example: 1
                bandwidth_num:
                  type: integer
                  description: 目标带宽，必须大于当前带宽
                  example: 20
                conpon_id:
                  type: integer
                  description: 优惠券id，有自定义价格无法使用优惠券
                  example: 0
              required:
                - access_token
                - sub_account_id
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
                msg: 带宽升级成功！
                time: '1789718626'
                data:
                  orderId: 1
                  orderNumber: 20260918xxxxxx
                  origin_price: '1.00'
                  real_price: '1.00'
                  priceDetail:
                    beforeBandwidth: 10
                    beforeUnitPrice: '45.00'
                    unitPrice: '45.00'
                    displayUnitPrice: '45.00'
                    leftDays: 330
                    total: '1.00'
                    originTotal: '1.00'
                    discount: '0.00'
                    isCustomPrice: 0
                    disabledConpon: false
                    country: US
                    bandwidth: 20
                  subAccount:
                    id: 1
                    sub_account: 1
                    username: xxxxxx
                    password: xxxxxx
                    country: US
                    bandwidth_num: 20
                    start_time: 1789712799
                    end_time: 1818224799
                    status: 0
                    expire_tag: ''
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅不限流量
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-520399288-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
