# 预约静态住宅（原生）IP

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/product_order/bookingIPArea:
    post:
      summary: 预约静态住宅（原生）IP
      deprecated: false
      description: 如果没有您需要的国家或者地区，请预约静态住宅IP
      tags:
        - 用户IP子账号管理/静态住宅（原生）时长子账号
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
                  description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：1</b>
                  example: 1
                  type: integer
                num:
                  description: 需要预约的子账号数量
                  example: 0
                  type: integer
                country:
                  description: 预约国家名称，此处填写具体的国家名称即可。无需国家编码code
                  example: 美国
                  type: string
                native:
                  type: integer
                  description: 原生:0=非原生,1=本土原生。<b>此处固定为：1</b>
                  example: 1
              required:
                - access_token
                - type
                - num
                - country
                - native
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
                    description: 请求时间戳
                  data:
                    type: 'null'
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
      x-apifox-folder: 用户IP子账号管理/静态住宅（原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-239401036-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
