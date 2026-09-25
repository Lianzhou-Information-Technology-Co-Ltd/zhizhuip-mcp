# 获取静态住宅（非原生）对应国家列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/common/countryList:
    get:
      summary: 获取静态住宅（非原生）对应国家列表
      deprecated: false
      description: 获取静态住宅时长对应国家列表
      tags:
        - 用户IP子账号管理/静态住宅（非原生）时长子账号
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
          description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：1</b>
          required: true
          example: 1
          schema:
            type: integer
        - name: status
          in: query
          description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：1</b>
          required: true
          example: 1
          schema:
            type: integer
        - name: native
          in: query
          description: 原生:0=非原生,1=本土原生。<b>此处固定为：0</b>
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
                    title: 1为成功,0为失败
                    description: 响应编码:1=正常,0=错误
                  msg:
                    type: string
                    title: 失败时的提示信息
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
                            name_eng:
                              type: string
                              title: 国家英文
                              nullable: true
                            code:
                              type: string
                              title: 国家编码
                            weight:
                              type: integer
                              title: 排序字段,无实际意义(非库存量)
                          required:
                            - id
                            - name
                            - name_eng
                            - code
                            - weight
                          x-apifox-orders:
                            - id
                            - name
                            - name_eng
                            - code
                            - weight
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
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（非原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-117919471-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
