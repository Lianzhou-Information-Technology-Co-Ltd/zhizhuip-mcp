# 获取官网价格

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/tool/getOriginCustomPriceInfo:
    get:
      summary: 获取官网价格
      deprecated: false
      description: ''
      tags:
        - 工具管理
      parameters:
        - name: access_token
          in: query
          description: 用户api key。<a href="/9518263m0" target="_blank">api key获取方式</a>
          required: true
          example: '{{access_token}}'
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
                      origin_price_info:
                        type: object
                        properties:
                          drf:
                            type: string
                            description: 动态不限时价格
                          drft:
                            type: object
                            properties:
                              price30:
                                type: string
                                description: 30天有效期
                              price90:
                                type: string
                                description: 90天有效期
                              price180:
                                type: string
                                description: 180天有效期
                            required:
                              - price30
                              - price90
                              - price180
                            description: 动态限时定价
                          srt_native:
                            type: object
                            properties:
                              AE:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              BG:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              CA:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              DE:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              DK:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              ES:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              FR:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              GB:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                    description: 国家名称
                                  price7:
                                    type: string
                                    description: 7天定价
                                  price30:
                                    type: string
                                    description: 30天定价
                                  price90:
                                    type: string
                                    description: 90天定价
                                  price180:
                                    type: string
                                    description: 180天定价
                                  price360:
                                    type: string
                                    description: 360天定价
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                                description: 国家编码
                              HK:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              HU:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              ID:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              IL:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              'IN ':
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              JP:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              KR:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              MY:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              NL:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              PH:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              PK:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              SG:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              TH:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              TR:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              TW:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              US:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              VN:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                              ZA:
                                type: object
                                properties:
                                  country_name:
                                    type: string
                                  price7:
                                    type: string
                                  price30:
                                    type: string
                                  price90:
                                    type: string
                                  price180:
                                    type: string
                                  price360:
                                    type: string
                                required:
                                  - country_name
                                  - price7
                                  - price30
                                  - price90
                                  - price180
                                  - price360
                            required:
                              - AE
                              - BG
                              - CA
                              - DE
                              - DK
                              - ES
                              - FR
                              - GB
                              - HK
                              - HU
                              - ID
                              - IL
                              - 'IN '
                              - JP
                              - KR
                              - MY
                              - NL
                              - PH
                              - PK
                              - SG
                              - TH
                              - TR
                              - TW
                              - US
                              - VN
                              - ZA
                            description: 静态住宅原生价格
                          sct:
                            type: object
                            properties:
                              price7:
                                type: string
                              price30:
                                type: string
                              price90:
                                type: string
                              price180:
                                type: string
                              price360:
                                type: string
                            required:
                              - price7
                              - price30
                              - price90
                              - price180
                              - price360
                            description: 数据中心定价
                          str_normal:
                            type: object
                            properties:
                              price7:
                                type: string
                              price30:
                                type: string
                              price90:
                                type: string
                              price180:
                                type: string
                              price360:
                                type: string
                            required:
                              - price7
                              - price30
                              - price90
                              - price180
                              - price360
                            description: 静态住宅普通定价
                        required:
                          - drf
                          - drft
                          - srt_native
                          - sct
                          - str_normal
                        description: 平台价格
                    required:
                      - origin_price_info
                required:
                  - code
                  - msg
                  - time
                  - data
              example:
                code: 1
                msg: 获取成功!
                time: '1777518536'
                data:
                  origin_price_info:
                    drf: '27.90'
                    drft:
                      price30: '21.50'
                      price90: '23.60'
                      price180: '25.70'
                    srt_native:
                      AE:
                        country_name: 阿联酋
                        price7: '24.00'
                        price30: '60.00'
                        price90: '160.00'
                        price180: '300.00'
                        price360: '550.00'
                      BG:
                        country_name: 保加利亚
                        price7: '13.77'
                        price30: '59.00'
                        price90: '173.00'
                        price180: '336.00'
                        price360: '637.00'
                      CA:
                        country_name: 加拿大
                        price7: '24.00'
                        price30: '60.00'
                        price90: '160.00'
                        price180: '300.00'
                        price360: '550.00'
                      DE:
                        country_name: 德国
                        price7: '24.00'
                        price30: '60.00'
                        price90: '160.00'
                        price180: '300.00'
                        price360: '550.00'
                      DK:
                        country_name: 丹麦
                        price7: '30.00'
                        price30: '59.00'
                        price90: '173.00'
                        price180: '336.00'
                        price360: '637.00'
                      ES:
                        country_name: 西班牙
                        price7: '24.00'
                        price30: '60.00'
                        price90: '160.00'
                        price180: '300.00'
                        price360: '550.00'
                      FR:
                        country_name: 法国
                        price7: '23.00'
                        price30: '49.00'
                        price90: '129.00'
                        price180: '259.00'
                        price360: '505.00'
                      GB:
                        country_name: 英国
                        price7: '23.00'
                        price30: '49.00'
                        price90: '129.00'
                        price180: '259.00'
                        price360: '505.00'
                      HK:
                        country_name: 香港
                        price7: '28.00'
                        price30: '69.00'
                        price90: '199.00'
                        price180: '399.00'
                        price360: '799.00'
                      HU:
                        country_name: 匈牙利
                        price7: '30.00'
                        price30: '59.00'
                        price90: '173.00'
                        price180: '336.00'
                        price360: '637.00'
                      ID:
                        country_name: 印度尼西亚
                        price7: '35.00'
                        price30: '79.00'
                        price90: '229.00'
                        price180: '459.00'
                        price360: '918.00'
                      IL:
                        country_name: 以色列
                        price7: '25.00'
                        price30: '49.00'
                        price90: '144.00'
                        price180: '279.00'
                        price360: '529.00'
                      'IN ':
                        country_name: ''
                        price7: '28.00'
                        price30: '69.00'
                        price90: '199.00'
                        price180: '399.00'
                        price360: '799.00'
                      JP:
                        country_name: 日本
                        price7: '30.00'
                        price30: '85.00'
                        price90: '225.00'
                        price180: '420.00'
                        price360: '780.00'
                      KR:
                        country_name: 韩国
                        price7: '23.00'
                        price30: '49.00'
                        price90: '129.00'
                        price180: '259.00'
                        price360: '505.00'
                      MY:
                        country_name: 马来西亚
                        price7: '25.00'
                        price30: '90.00'
                        price90: '256.50'
                        price180: '496.00'
                        price360: '972.00'
                      NL:
                        country_name: 荷兰
                        price7: '23.00'
                        price30: '49.00'
                        price90: '129.00'
                        price180: '259.00'
                        price360: '505.00'
                      PH:
                        country_name: 菲律宾
                        price7: '44.00'
                        price30: '89.00'
                        price90: '253.00'
                        price180: '480.00'
                        price360: '940.00'
                      PK:
                        country_name: 巴基斯坦
                        price7: '45.00'
                        price30: '120.00'
                        price90: '340.00'
                        price180: '650.00'
                        price360: '1250.00'
                      SG:
                        country_name: 新加坡
                        price7: '40.00'
                        price30: '69.00'
                        price90: '195.00'
                        price180: '380.00'
                        price360: '750.00'
                      TH:
                        country_name: 泰国
                        price7: '44.00'
                        price30: '89.00'
                        price90: '261.00'
                        price180: '507.00'
                        price360: '961.00'
                      TR:
                        country_name: 土耳其
                        price7: '33.00'
                        price30: '65.00'
                        price90: '191.00'
                        price180: '370.00'
                        price360: '702.00'
                      TW:
                        country_name: 中国台湾省
                        price7: '40.00'
                        price30: '89.00'
                        price90: '259.00'
                        price180: '509.00'
                        price360: '999.00'
                      US:
                        country_name: 美国
                        price7: '19.00'
                        price30: '39.00'
                        price90: '104.00'
                        price180: '195.00'
                        price360: '385.00'
                      VN:
                        country_name: 越南
                        price7: '35.00'
                        price30: '79.00'
                        price90: '229.00'
                        price180: '459.00'
                        price360: '918.00'
                      ZA:
                        country_name: 南非
                        price7: '24.00'
                        price30: '60.00'
                        price90: '160.00'
                        price180: '300.00'
                        price360: '550.00'
                    sct:
                      price7: '13.00'
                      price30: '26.00'
                      price90: '71.50'
                      price180: '123.50'
                      price360: '234.00'
                    str_normal:
                      price7: '19.50'
                      price30: '39.00'
                      price90: '104.00'
                      price180: '195.00'
                      price360: '385.00'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 工具管理
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-451668961-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
