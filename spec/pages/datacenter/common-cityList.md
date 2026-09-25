# 获取数据中心对应城市列表

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
      summary: 获取数据中心对应城市列表
      deprecated: false
      description: 获取数据中心对应城市列表
      tags:
        - 用户IP子账号管理/数据中心时长子账号
      parameters:
        - name: access_token
          in: query
          description: 用户token。用户登录之后，获取token
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: country_id
          in: query
          description: >-
            数据中心国家id。国家id在<a target="_blank"
            href="/api-117932943">数据中心对应国家列表</a>接口获取
          required: true
          example: '3964'
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
                              description: 城市id。即：city_id
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
              example:
                code: 1
                msg: 获取成功!
                time: '1697681389'
                data:
                  citys:
                    - id: 11
                      name: Los Angeles
                      code: Los Angeles
                      type_text: ''
                      status_text: ''
                    - id: 22
                      name: New York City
                      code: New York City
                      type_text: ''
                      status_text: ''
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/数据中心时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-117932961-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
