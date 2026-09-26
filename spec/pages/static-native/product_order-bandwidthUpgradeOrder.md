# 子账号带宽升级

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/product_order/bandwidthUpgradeOrder:
    post:
      summary: 子账号带宽升级
      deprecated: false
      description: 有已过期的子账号时，要先续费再升级
      tags:
        - 用户IP子账号管理/静态住宅（原生）时长子账号
      parameters:
        - name: access_token
          in: query
          description: ''
          required: false
          example: '{{access_token}}'
          schema:
            type: string
        - name: type
          in: query
          description: 产品类型:0=全球动态住宅，1=全球静态住宅，2=全球数据中心
          required: true
          example: 1
          schema:
            type: integer
        - name: status
          in: query
          description: 适用计费方式:1=时长计费
          required: true
          example: 1
          schema:
            type: integer
        - name: native
          in: query
          description: 原生:0=非原生,1=本土原生
          required: true
          example: 1
          schema:
            type: integer
        - name: sub_accounts[]
          in: query
          description: 要升级的子账号 id 列表。单次最多200个
          required: true
          example:
            - '23'
            - '24'
          schema:
            type: array
            items:
              type: string
        - name: bandwidth_num
          in: query
          description: 升级后的目标带宽，必须大于子账号当前带宽，可选值用带宽套餐列表查
          required: true
          example: 10
          schema:
            type: integer
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
                  msg:
                    type: string
                  time:
                    type: string
                  data:
                    type: object
                    properties:
                      orderId:
                        type: integer
                        title: 订单Id
                      orderNumber:
                        type: string
                        title: 订单号
                      price:
                        type: string
                        title: 价格
                    required:
                      - orderId
                      - orderNumber
                      - price
                    x-apifox-orders:
                      - orderId
                      - orderNumber
                      - price
                required:
                  - code
                  - msg
                  - time
                  - data
                x-apifox-orders:
                  - code
                  - msg
                  - time
                  - data
              example:
                code: 1
                msg: 带宽升级订单创建成功！
                time: '1755159289'
                data:
                  orderId: 772
                  orderNumber: 20250814161450689d9afa058a4
                  price: '2030.00'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-346237528-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
