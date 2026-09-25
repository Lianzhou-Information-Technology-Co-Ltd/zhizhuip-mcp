# 购买动态住宅流量

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
      summary: 购买动态住宅流量
      deprecated: false
      description: 购买动态住宅流量
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(永久)
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
                  description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：0</b>
                  example: 0
                  type: integer
                status:
                  description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：0</b>
                  example: 0
                  type: integer
                num:
                  description: 需要购买的流量数量。单位：GB。范围：1-300GB之间
                  example: 1
                  type: integer
                conpon_id:
                  description: >-
                    优惠券id。根据<a href="/api-116480625"
                    target="_blank">查询优惠券列表</a>获取对应的优惠券id
                  example: 4542
                  type: integer
                is_month:
                  type: integer
                  description: 流量是否限时:0=永久,1=期限
                  example: 0
                bill_timelen:
                  type: integer
                  description: 流量有效时长:1=30天，2=90天，3=180天
                  example: 1
              required:
                - type
                - status
                - num
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
                    description: 响应体
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
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(永久)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-116480626-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
