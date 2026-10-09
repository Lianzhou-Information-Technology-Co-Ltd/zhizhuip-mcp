# 获取静态住宅（IPV6）对应城市列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/common/cityList:
    get:
      summary: 获取静态住宅（IPV6）对应城市列表
      deprecated: false
      description: 获取静态住宅（ipv6）时长对应城市列表
      tags:
        - 用户IP子账号管理/静态住宅（IPV6）时长子账号
      parameters:
        - name: access_token
          in: query
          description: 用户api key。<a href="/9518263m0" target="_blank">api key获取方式</a>
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: country_id
          in: query
          description: >-
            静态住宅国家id。国家id在<a target="_blank"
            href="/api-244532508">静态住宅（ipv6）对应国家列表</a>接口获取
          required: true
          example: '4029'
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
                      citys:
                        type: array
                        items:
                          type: object
                          properties:
                            id:
                              type: integer
                              description: 城市id，即：city_id
                            name:
                              type: string
                              description: 城市名称
                            code:
                              type: string
                              description: 城市名称，同name
                            type_text:
                              type: string
                            status_text:
                              type: string
                          required:
                            - id
                            - name
                            - code
                            - type_text
                            - status_text
                          x-apifox-orders:
                            - id
                            - name
                            - code
                            - type_text
                            - status_text
                        description: 城市列表
                    required:
                      - citys
                    x-apifox-orders:
                      - citys
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
      x-apifox-folder: 用户IP子账号管理/静态住宅（IPV6）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-244532509-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
