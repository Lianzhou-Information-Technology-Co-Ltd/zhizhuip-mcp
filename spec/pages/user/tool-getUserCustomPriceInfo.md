# 获取用户价格

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/tool/getUserCustomPriceInfo:
    get:
      summary: 获取用户价格
      deprecated: false
      description: |-
        1、平台余额为0或平台余额小于订单金额时会下单失败，
        2、优惠额度小于订单金额时购买会使用官网定价而不是用户优惠价，需及时关注；
        3、如果优惠定价为null则是没有设定优惠，购买时会按照官网价格下单
      tags:
        - 用户管理
      parameters:
        - name: access_token
          in: query
          description: 用户token。用户登录之后，获取$data.userinfo.token
          required: true
          example: '{{access_token}}'
          schema:
            type: string
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
                      user_price_info:
                        type: object
                        properties:
                          drf:
                            type: integer
                            description: 动态不限时优惠价格
                          drft:
                            type: object
                            properties:
                              price30:
                                type: 'null'
                              price90:
                                type: 'null'
                              price180:
                                type: 'null'
                            required:
                              - price30
                              - price90
                              - price180
                            description: 动态限时优惠价格
                            x-apifox-orders:
                              - price30
                              - price90
                              - price180
                          srt_native:
                            type: object
                            properties:
                              GB:
                                type: object
                                properties:
                                  price7:
                                    type: 'null'
                                  price30:
                                    type: string
                                  price90:
                                    type: 'null'
                                  price180:
                                    type: 'null'
                                  price360:
                                    type: 'null'
                                  country_name:
                                    type: string
                                required:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                                x-apifox-orders:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                              HK:
                                type: object
                                properties:
                                  price7:
                                    type: 'null'
                                  price30:
                                    type: string
                                  price90:
                                    type: 'null'
                                  price180:
                                    type: 'null'
                                  price360:
                                    type: 'null'
                                  country_name:
                                    type: string
                                required:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                                x-apifox-orders:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                              ID:
                                type: object
                                properties:
                                  price7:
                                    type: 'null'
                                  price30:
                                    type: string
                                  price90:
                                    type: 'null'
                                  price180:
                                    type: 'null'
                                  price360:
                                    type: 'null'
                                  country_name:
                                    type: string
                                required:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                                x-apifox-orders:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                              IN:
                                type: object
                                properties:
                                  price7:
                                    type: string
                                  price30:
                                    type: 'null'
                                  price90:
                                    type: 'null'
                                  price180:
                                    type: 'null'
                                  price360:
                                    type: 'null'
                                  country_name:
                                    type: string
                                required:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                                x-apifox-orders:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                              US:
                                type: object
                                properties:
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                  country_name:
                                    type: string
                                required:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                                x-apifox-orders:
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                  - country_name
                            required:
                              - GB
                              - HK
                              - ID
                              - IN
                              - US
                            description: 静态住宅原生优惠价格
                            x-apifox-orders:
                              - GB
                              - HK
                              - ID
                              - IN
                              - US
                          sct:
                            type: object
                            properties:
                              price7:
                                type: number
                              price30:
                                type: integer
                              price90:
                                type: 'null'
                              price180:
                                type: 'null'
                              price360:
                                type: 'null'
                            required:
                              - price7
                              - price30
                              - price90
                              - price180
                              - price360
                            description: 数据中心优惠价格
                            x-apifox-orders:
                              - price7
                              - price30
                              - price90
                              - price180
                              - price360
                          str_normal:
                            type: object
                            properties:
                              price7:
                                type: number
                              price30:
                                type: integer
                              price90:
                                type: integer
                              price180:
                                type: 'null'
                              price360:
                                type: 'null'
                            required:
                              - price7
                              - price30
                              - price90
                              - price180
                              - price360
                            description: 静态住宅普通优惠价格
                            x-apifox-orders:
                              - price7
                              - price30
                              - price90
                              - price180
                              - price360
                        required:
                          - drf
                          - drft
                          - srt_native
                          - sct
                          - str_normal
                        description: 用户价格
                        x-apifox-orders:
                          - drf
                          - drft
                          - srt_native
                          - sct
                          - str_normal
                      product_price_balance:
                        type: number
                        description: 平台余额
                      remind:
                        type: integer
                        description: 优惠额度
                    required:
                      - user_price_info
                      - product_price_balance
                      - remind
                    x-apifox-orders:
                      - user_price_info
                      - product_price_balance
                      - remind
                    description: 优惠价详情
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
                msg: 获取成功!
                time: '1777518604'
                data:
                  user_price_info:
                    drf: 20
                    drft:
                      price30: null
                      price90: null
                      price180: null
                    srt_native:
                      GB:
                        price7: null
                        price30: '1.00'
                        price90: null
                        price180: null
                        price360: null
                        country_name: 英国
                      HK:
                        price7: null
                        price30: '1.00'
                        price90: null
                        price180: null
                        price360: null
                        country_name: 香港
                      ID:
                        price7: null
                        price30: '1.00'
                        price90: null
                        price180: null
                        price360: null
                        country_name: 印度尼西亚
                      IN:
                        price7: '0.10'
                        price30: null
                        price90: null
                        price180: null
                        price360: null
                        country_name: 印度
                      US:
                        price7: '0.10'
                        price30: '1.00'
                        price90: '60.00'
                        price180: '0.00'
                        price360: '0.00'
                        country_name: 美国
                    sct:
                      price7: 0.1
                      price30: 1
                      price90: null
                      price180: null
                      price360: null
                    str_normal:
                      price7: 0.1
                      price30: 1
                      price90: 60
                      price180: null
                      price360: null
                  product_price_balance: 7707.1
                  remind: 0
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户管理
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-451755849-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
