# 查询购买的动态住宅流量套餐记录

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/device/userSetMeal:
    get:
      summary: 查询购买的动态住宅流量套餐记录
      deprecated: false
      description: 查询购买的动态住宅流量套餐记录
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(期限)
      parameters:
        - name: access_token
          in: query
          description: 用户token。用户登录之后，获取token
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: type
          in: query
          description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：0</b>
          required: true
          example: 0
          schema:
            type: integer
        - name: status
          in: query
          description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：0</b>
          required: true
          example: 0
          schema:
            type: integer
        - name: page
          in: query
          description: 当前页数
          required: true
          example: 1
          schema:
            type: integer
        - name: pagesize
          in: query
          description: 每页显示数量
          required: true
          example: 10
          schema:
            type: integer
        - name: is_month
          in: query
          description: 流量是否限时:0=永久,1=期限。<b>此处固定为：1</b>
          required: true
          example: 1
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
                    description: 响应编码:1=正常,0=错误
                  msg:
                    type: string
                    description: 响应说明
                  time:
                    type: string
                  data:
                    type: object
                    properties:
                      total:
                        type: integer
                        description: 总数
                      rows:
                        type: array
                        items:
                          type: object
                          properties:
                            id:
                              type: integer
                            name:
                              type: string
                              description: 套餐名称
                            bill:
                              type: string
                              description: 套餐流量
                            money:
                              type: string
                              description: 套餐金额
                            type:
                              type: string
                              description: 套餐类型
                            createtime:
                              type: integer
                              description: 购买时间
                            set_meal_id:
                              type: integer
                            is_renew:
                              type: string
                              description: 是否自动续费
                            createtime_text:
                              type: string
                          required:
                            - id
                            - name
                            - bill
                            - money
                            - type
                            - createtime
                            - set_meal_id
                            - is_renew
                            - createtime_text
                          x-apifox-orders:
                            - id
                            - name
                            - bill
                            - money
                            - type
                            - createtime
                            - set_meal_id
                            - is_renew
                            - createtime_text
                        description: 内容
                    required:
                      - total
                      - rows
                    x-apifox-orders:
                      - total
                      - rows
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
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595774-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
