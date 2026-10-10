# 获取静态住宅（原生）对应城市列表

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
      summary: 获取静态住宅（原生）对应城市列表
      deprecated: false
      description: 获取静态住宅（原生）时长对应城市列表
      tags:
        - 用户IP子账号管理/静态住宅（原生）时长子账号
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
            href="/api-239401043">静态住宅（原生）对应国家列表</a>接口获取
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
                            state_id:
                              type: integer
                            country_id:
                              type: integer
                            state_code:
                              type: string
                            country_code:
                              type: string
                          required:
                            - id
                            - name
                            - code
                            - state_id
                            - country_id
                            - state_code
                            - country_code
                        description: 城市列表
                    required:
                      - citys
                required:
                  - code
                  - msg
                  - time
                  - data
              example:
                code: 1
                msg: 获取成功!
                time: '1791605395'
                data:
                  citys:
                    - id: 1
                      name: Kuala Lumpur
                      code: Kuala Lumpur
                      state_id: 11
                      country_id: 111
                      state_code: Kuala Lumpur
                      country_code: MY
                    - id: 2
                      name: Perai
                      code: Perai
                      state_id: 22
                      country_id: 222
                      state_code: Penang
                      country_code: MY
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-239401044-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
