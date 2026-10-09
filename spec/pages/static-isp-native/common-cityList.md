# 获取静态住宅（运营商原生）对应城市列表

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
      summary: 获取静态住宅（运营商原生）对应城市列表
      deprecated: false
      description: 获取静态住宅时长对应城市列表
      tags:
        - 用户IP子账号管理/静态住宅（运营商原生）时长子账号
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
            href="/api-494467034">静态住宅（运营商原生）对应国家列表</a>接口获取
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
                          required:
                            - id
                            - name
                            - code
                          x-apifox-orders:
                            - id
                            - name
                            - code
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
                time: '1697681198'
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
                    - id: 33
                      name: Chicago
                      code: Chicago
                      type_text: ''
                      status_text: ''
                    - id: 44
                      name: Houston
                      code: Houston
                      type_text: ''
                      status_text: ''
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-494467035-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
