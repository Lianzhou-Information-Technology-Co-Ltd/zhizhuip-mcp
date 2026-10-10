# 获取动态住宅州/省份列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/common/stateList:
    get:
      summary: 获取动态住宅州/省份列表
      deprecated: false
      description: 获取动态住宅时长对应州、省
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(期限)
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
          description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：0</b>
          required: true
          example: '0'
          schema:
            type: string
        - name: status
          in: query
          description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：0</b>
          required: true
          example: '0'
          schema:
            type: string
        - name: country_id
          in: query
          description: 所属国家id,从返回的国家列表中获取
          required: true
          example: 1905
          schema:
            type: integer
        - name: country_code
          in: query
          description: 所属国家编码
          required: false
          example: US
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
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: integer
                        name:
                          type: string
                          description: 州/省名称
                        code:
                          type: string
                          description: 州/省编码
                        country_code:
                          type: string
                          description: 州/省对应国家编码
                      required:
                        - id
                        - name
                        - code
                        - country_code
                      x-apifox-orders:
                        - id
                        - name
                        - code
                        - country_code
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
                time: '1791604334'
                data:
                  - id: 1
                    name: Arkansas
                    code: Arkansas
                    country_code: US
                  - id: 2
                    name: Virginia
                    code: Virginia
                    country_code: US
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595785-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
