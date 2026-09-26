# 获取静态住宅（原生）对应国家列表

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
      summary: 获取静态住宅（原生）对应国家列表
      deprecated: false
      description: 获取静态住宅（原生）时长对应国家列表
      tags:
        - 用户IP子账号管理/静态住宅（原生）时长子账号
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
          description: 原生:0=非原生,1=本土原生。<b>此处固定为：1</b>
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
                            code:
                              type: string
                              title: 国家编码
                            weight:
                              type: integer
                              title: 排序字段
                              description: 排序字段(非库存量)
                          required:
                            - id
                            - name
                            - code
                            - weight
                          x-apifox-orders:
                            - id
                            - name
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
              example:
                code: 1
                msg: 获取成功!
                time: '1767408885'
                data:
                  countrys:
                    - id: 4073
                      name: 美国
                      name_eng: United States
                      code: US
                      weight: 62748
                    - id: 4075
                      name: 英国
                      name_eng: United Kingdom
                      code: GB
                      weight: 2270
                    - id: 4087
                      name: 日本
                      name_eng: null
                      code: JP
                      weight: 1010
                    - id: 4085
                      name: 德国
                      name_eng: null
                      code: DE
                      weight: 755
                    - id: 4080
                      name: 韩国
                      name_eng: null
                      code: KR
                      weight: 622
                    - id: 4082
                      name: 加拿大
                      name_eng: null
                      code: CA
                      weight: 504
                    - id: 4076
                      name: 法国
                      name_eng: France
                      code: FR
                      weight: 503
                    - id: 4074
                      name: 中国台湾省
                      name_eng: Taiwan
                      code: TW
                      weight: 311
                    - id: 4084
                      name: 阿联酋
                      name_eng: null
                      code: AE
                      weight: 252
                    - id: 4091
                      name: 荷兰
                      name_eng: null
                      code: NL
                      weight: 252
                    - id: 4093
                      name: 西班牙
                      name_eng: null
                      code: ES
                      weight: 252
                    - id: 4094
                      name: 香港
                      name_eng: null
                      code: HK
                      weight: 252
                    - id: 4081
                      name: 越南
                      name_eng: null
                      code: VN
                      weight: 246
                    - id: 4078
                      name: 印度
                      name_eng: null
                      code: IN
                      weight: 242
                    - id: 4077
                      name: 印度尼西亚
                      name_eng: Indonesia
                      code: ID
                      weight: 194
                    - id: 4083
                      name: 巴基斯坦
                      name_eng: null
                      code: PK
                      weight: 186
                    - id: 4092
                      name: 马来西亚
                      name_eng: null
                      code: MY
                      weight: 155
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-239401043-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
