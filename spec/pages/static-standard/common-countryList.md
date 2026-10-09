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
      description: 获取静态住宅（非原生）子账号时长对应国家列表
      tags:
        - 用户IP子账号管理/静态住宅（非原生）时长子账号
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
              example:
                code: 1
                msg: 获取成功!
                time: '1767408564'
                data:
                  countrys:
                    - id: 4035
                      name: 香港
                      name_eng: Hong Kong
                      code: HK
                      weight: 3359
                    - id: 4053
                      name: 越南
                      name_eng: Vietnam
                      code: VN
                      weight: 1258
                    - id: 4054
                      name: 日本
                      name_eng: Japan
                      code: JP
                      weight: 1193
                    - id: 4034
                      name: 中国台湾省
                      name_eng: Taiwan
                      code: TW
                      weight: 758
                    - id: 4058
                      name: 印度尼西亚
                      name_eng: Indonesia
                      code: ID
                      weight: 746
                    - id: 4057
                      name: 新加坡
                      name_eng: Singapore
                      code: SG
                      weight: 740
                    - id: 4060
                      name: 印度
                      name_eng: India
                      code: IN
                      weight: 739
                    - id: 4052
                      name: 泰国
                      name_eng: Thailand
                      code: TH
                      weight: 722
                    - id: 4056
                      name: 菲律宾
                      name_eng: Philippines
                      code: PH
                      weight: 721
                    - id: 4038
                      name: 英国
                      name_eng: United Kingdom
                      code: GB
                      weight: 714
                    - id: 4051
                      name: 德国
                      name_eng: Germany
                      code: DE
                      weight: 671
                    - id: 4050
                      name: 法国
                      name_eng: France
                      code: FR
                      weight: 506
                    - id: 4037
                      name: 韩国
                      name_eng: South Korea
                      code: KR
                      weight: 505
                    - id: 4055
                      name: 马来西亚
                      name_eng: Malaysia
                      code: MY
                      weight: 477
                    - id: 4046
                      name: 肯尼亚
                      name_eng: Kenya
                      code: KE
                      weight: 253
                    - id: 4040
                      name: 柬埔寨
                      name_eng: Cambodia
                      code: KH
                      weight: 252
                    - id: 4043
                      name: 马里
                      name_eng: Mali
                      code: ML
                      weight: 252
                    - id: 4044
                      name: 加纳
                      name_eng: Ghana
                      code: GH
                      weight: 252
                    - id: 4047
                      name: 莫桑比克
                      name_eng: Mozambique
                      code: MZ
                      weight: 252
                    - id: 4088
                      name: 巴西
                      name_eng: null
                      code: BR
                      weight: 252
                    - id: 4090
                      name: 墨西哥
                      name_eng: null
                      code: MX
                      weight: 252
                    - id: 4063
                      name: 西班牙
                      name_eng: null
                      code: ES
                      weight: 249
                    - id: 4059
                      name: 澳大利亚
                      name_eng: Australia
                      code: AU
                      weight: 248
                    - id: 4062
                      name: 沙特阿拉伯
                      name_eng: Saudi Arabia
                      code: SA
                      weight: 149
                    - id: 4041
                      name: 老挝
                      name_eng: Lao People's Democratic Republic
                      code: LA
                      weight: 24
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
