# 获取动态住宅城市列表

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
      summary: 获取动态住宅城市列表
      deprecated: false
      description: 获取静态住宅时长对应国家列表
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
        - name: state_id
          in: query
          description: 所属州/省份id,从返回的州/省份列表中获取
          required: true
          example: 2885
          schema:
            type: integer
        - name: state_code
          in: query
          description: 所属州/省份编码
          required: false
          example: Arkansas
          schema:
            type: string
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
                    type: object
                    properties:
                      countrys:
                        type: array
                        items:
                          type: object
                          properties:
                            id:
                              type: integer
                              title: 国家id。即：country_id
                            name:
                              type: string
                              title: 国家名称
                            image:
                              type: string
                            code:
                              type: string
                              title: 国家编码
                            type_text:
                              type: string
                            status_text:
                              type: string
                          required:
                            - id
                            - name
                            - image
                            - code
                            - type_text
                            - status_text
                          x-apifox-orders:
                            - id
                            - name
                            - image
                            - code
                            - type_text
                            - status_text
                        title: 国家列表
                    required:
                      - countrys
                    x-apifox-orders:
                      - countrys
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
                time: '1697680105'
                data:
                  countrys:
                    - id: 11
                      name: 美国
                      image: ''
                      code: US
                      type_text: ''
                      status_text: ''
                    - id: 12
                      name: 中国台湾省
                      image: ''
                      code: TW
                      type_text: ''
                      status_text: ''
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595786-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
