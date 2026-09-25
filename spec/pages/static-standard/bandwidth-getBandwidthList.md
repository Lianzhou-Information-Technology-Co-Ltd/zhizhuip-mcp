# 带宽套餐列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/bandwidth/getBandwidthList:
    get:
      summary: 带宽套餐列表
      deprecated: false
      description: ''
      tags:
        - 用户IP子账号管理/静态住宅（非原生）时长子账号
      parameters:
        - name: access_token
          in: query
          description: ''
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: type
          in: query
          description: 产品类型:1=全球静态住宅
          required: true
          example: 1
          schema:
            type: integer
        - name: country
          in: query
          description: 国家编码
          required: true
          example: GB
          schema:
            type: string
        - name: native
          in: query
          description: 原生类别:0=非原生,1=原生
          required: true
          example: 0
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
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: integer
                        name:
                          type: string
                          title: 带宽名称
                        num:
                          type: integer
                          title: 带宽值(单位M)
                        price:
                          type: string
                          title: 每天单价
                          description: 子帐号升级到当前带宽，每一天需要支付的价格
                        month_price:
                          type: string
                          title: 月价格
                        is_diy:
                          type: string
                          title: 是否自定义，0=否,1=是
                        is_recommend:
                          type: string
                          title: 是否推荐
                        discount:
                          type: string
                          title: 折扣值
                      required:
                        - id
                        - name
                        - num
                        - price
                        - month_price
                        - is_diy
                        - is_recommend
                        - discount
                      x-apifox-orders:
                        - id
                        - name
                        - num
                        - price
                        - month_price
                        - is_diy
                        - is_recommend
                        - discount
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
                time: '1757054472'
                data:
                  - id: 1
                    name: ''
                    num: 5
                    price: '0.00'
                    month_price: '0.00'
                    is_diy: '0'
                    is_recommend: '0'
                    discount: '100.00'
                  - id: 2
                    name: 2K
                    num: 10
                    price: '0.47'
                    month_price: '14.10'
                    is_diy: '0'
                    is_recommend: '1'
                    discount: '100.00'
                  - id: 3
                    name: 4K
                    num: 15
                    price: '0.71'
                    month_price: '21.30'
                    is_diy: '0'
                    is_recommend: '0'
                    discount: '100.00'
                  - id: 4
                    name: 高码率
                    num: 20
                    price: '0.95'
                    month_price: '28.50'
                    is_diy: '0'
                    is_recommend: '0'
                    discount: '100.00'
                  - id: 5
                    name: ''
                    num: 30
                    price: '1.42'
                    month_price: '42.60'
                    is_diy: '0'
                    is_recommend: '0'
                    discount: '100.00'
                  - id: 6
                    name: ''
                    num: 40
                    price: '1.90'
                    month_price: '57.00'
                    is_diy: '0'
                    is_recommend: '0'
                    discount: '100.00'
                  - id: 7
                    name: ''
                    num: 50
                    price: '2.38'
                    month_price: '71.40'
                    is_diy: '1'
                    is_recommend: '0'
                    discount: '98.00'
                  - id: 8
                    name: ''
                    num: 60
                    price: '2.85'
                    month_price: '85.50'
                    is_diy: '1'
                    is_recommend: '0'
                    discount: '95.00'
                  - id: 9
                    name: ''
                    num: 70
                    price: '3.33'
                    month_price: '99.90'
                    is_diy: '1'
                    is_recommend: '0'
                    discount: '95.00'
                  - id: 10
                    name: ''
                    num: 80
                    price: '3.81'
                    month_price: '114.30'
                    is_diy: '1'
                    is_recommend: '0'
                    discount: '92.00'
                  - id: 11
                    name: ''
                    num: 90
                    price: '4.28'
                    month_price: '128.40'
                    is_diy: '1'
                    is_recommend: '0'
                    discount: '92.00'
                  - id: 12
                    name: ''
                    num: 100
                    price: '4.76'
                    month_price: '142.80'
                    is_diy: '1'
                    is_recommend: '0'
                    discount: '92.00'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（非原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-345585696-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
