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
          description: 用户api key。<a href="/9518263m0" target="_blank">api key获取方式</a>
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
