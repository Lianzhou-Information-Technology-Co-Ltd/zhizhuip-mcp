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
      description: 获取动态住宅时长对应城市列表
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(永久)
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
                time: '1767576452'
                data:
                  citys:
                    - id: 91586
                      name: Donetsk
                      code: Donetsk
                      state_id: 241
                      country_id: 1902
                      state_code: Donetsk Oblast
                      country_code: UA
                    - id: 91587
                      name: Simferopol
                      code: Simferopol
                      state_id: 235
                      country_id: 1902
                      state_code: Crimea
                      country_code: UA
                    - id: 91588
                      name: Dnipro
                      code: Dnipro
                      state_id: 242
                      country_id: 1902
                      state_code: Dnipropetrovsk Oblast
                      country_code: UA
                    - id: 91589
                      name: Khmelnytskyi
                      code: Khmelnytskyi
                      state_id: 232
                      country_id: 1902
                      state_code: Luhansk
                      country_code: UA
                    - id: 91590
                      name: Kryvyy Rih
                      code: Kryvyy Rih
                      state_id: 242
                      country_id: 1902
                      state_code: Dnipropetrovsk Oblast
                      country_code: UA
                    - id: 91591
                      name: Kyiv
                      code: Kyiv
                      state_id: 234
                      country_id: 1902
                      state_code: Kyiv City
                      country_code: UA
                    - id: 91592
                      name: Marhanets
                      code: Marhanets
                      state_id: 242
                      country_id: 1902
                      state_code: Dnipropetrovsk Oblast
                      country_code: UA
                    - id: 91593
                      name: Ternopil
                      code: Ternopil
                      state_id: 224
                      country_id: 1902
                      state_code: Ternopil Oblast
                      country_code: UA
                    - id: 91594
                      name: Vinnytsya
                      code: Vinnytsya
                      state_id: 223
                      country_id: 1902
                      state_code: Vinnytsya Oblast
                      country_code: UA
                    - id: 91595
                      name: Khust
                      code: Khust
                      state_id: 221
                      country_id: 1902
                      state_code: Transcarpathia
                      country_code: UA
                    - id: 91596
                      name: Kropyvnytskyy
                      code: Kropyvnytskyy
                      state_id: 236
                      country_id: 1902
                      state_code: Kirovohrad Oblast
                      country_code: UA
                    - id: 91597
                      name: Luhansk
                      code: Luhansk
                      state_id: 232
                      country_id: 1902
                      state_code: Luhansk
                      country_code: UA
                    - id: 91598
                      name: Polonne
                      code: Polonne
                      state_id: 227
                      country_id: 1902
                      state_code: Rivne
                      country_code: UA
                    - id: 91599
                      name: Sumy
                      code: Sumy
                      state_id: 225
                      country_id: 1902
                      state_code: Sumy
                      country_code: UA
                    - id: 91600
                      name: Uman
                      code: Uman
                      state_id: 245
                      country_id: 1902
                      state_code: Cherkasy Oblast
                      country_code: UA
                    - id: 91601
                      name: Uzhgorod
                      code: Uzhgorod
                      state_id: 221
                      country_id: 1902
                      state_code: Transcarpathia
                      country_code: UA
                    - id: 91602
                      name: Vynohradiv
                      code: Vynohradiv
                      state_id: 221
                      country_id: 1902
                      state_code: Transcarpathia
                      country_code: UA
                    - id: 91603
                      name: Zaporizhzhya
                      code: Zaporizhzhya
                      state_id: 220
                      country_id: 1902
                      state_code: Zaporizhzhya Oblast
                      country_code: UA
                    - id: 91604
                      name: Zhytomyr
                      code: Zhytomyr
                      state_id: 219
                      country_id: 1902
                      state_code: Zhytomyr
                      country_code: UA
                    - id: 91605
                      name: Kherson
                      code: Kherson
                      state_id: 238
                      country_id: 1902
                      state_code: Kherson Oblast
                      country_code: UA
                    - id: 91606
                      name: Sambir
                      code: Sambir
                      state_id: 231
                      country_id: 1902
                      state_code: Lviv Oblast
                      country_code: UA
                    - id: 91607
                      name: Hadyach
                      code: Hadyach
                      state_id: 228
                      country_id: 1902
                      state_code: Poltava Oblast
                      country_code: UA
                    - id: 91608
                      name: Horlivka
                      code: Horlivka
                      state_id: 241
                      country_id: 1902
                      state_code: Donetsk Oblast
                      country_code: UA
                    - id: 91609
                      name: Kharkiv
                      code: Kharkiv
                      state_id: 239
                      country_id: 1902
                      state_code: Kharkiv
                      country_code: UA
                    - id: 91610
                      name: Ladyzhyn
                      code: Ladyzhyn
                      state_id: 223
                      country_id: 1902
                      state_code: Vinnytsya Oblast
                      country_code: UA
                    - id: 91611
                      name: Yenakiieve
                      code: Yenakiieve
                      state_id: 241
                      country_id: 1902
                      state_code: Donetsk Oblast
                      country_code: UA
                    - id: 91612
                      name: Zhashkiv
                      code: Zhashkiv
                      state_id: 245
                      country_id: 1902
                      state_code: Cherkasy Oblast
                      country_code: UA
                    - id: 91613
                      name: Tulchyn
                      code: Tulchyn
                      state_id: 223
                      country_id: 1902
                      state_code: Vinnytsya Oblast
                      country_code: UA
                    - id: 91614
                      name: Izmail
                      code: Izmail
                      state_id: 229
                      country_id: 1902
                      state_code: Odessa
                      country_code: UA
                    - id: 91615
                      name: Novodnistrovsk
                      code: Novodnistrovsk
                      state_id: 243
                      country_id: 1902
                      state_code: Chernivtsi Oblast
                      country_code: UA
                    - id: 91616
                      name: Pokrovsk
                      code: Pokrovsk
                      state_id: 241
                      country_id: 1902
                      state_code: Donetsk Oblast
                      country_code: UA
                    - id: 91617
                      name: Shostka
                      code: Shostka
                      state_id: 225
                      country_id: 1902
                      state_code: Sumy
                      country_code: UA
                    - id: 91618
                      name: Starobilsk
                      code: Starobilsk
                      state_id: 232
                      country_id: 1902
                      state_code: Luhansk
                      country_code: UA
                    - id: 91619
                      name: Orzhytsya
                      code: Orzhytsya
                      state_id: 228
                      country_id: 1902
                      state_code: Poltava Oblast
                      country_code: UA
                    - id: 91620
                      name: Bakhchysarai
                      code: Bakhchysarai
                      state_id: 235
                      country_id: 1902
                      state_code: Crimea
                      country_code: UA
                    - id: 91621
                      name: Boryspil
                      code: Boryspil
                      state_id: 233
                      country_id: 1902
                      state_code: Kiev
                      country_code: UA
                    - id: 91622
                      name: Kadiyivka
                      code: Kadiyivka
                      state_id: 232
                      country_id: 1902
                      state_code: Luhansk
                      country_code: UA
                    - id: 91623
                      name: Lutsk
                      code: Lutsk
                      state_id: 222
                      country_id: 1902
                      state_code: Volyn
                      country_code: UA
                    - id: 91624
                      name: Mariupol
                      code: Mariupol
                      state_id: 241
                      country_id: 1902
                      state_code: Donetsk Oblast
                      country_code: UA
                    - id: 91625
                      name: Novoyavorivs'K
                      code: Novoyavorivs'K
                      state_id: 231
                      country_id: 1902
                      state_code: Lviv Oblast
                      country_code: UA
                    - id: 91626
                      name: Yahotyn
                      code: Yahotyn
                      state_id: 233
                      country_id: 1902
                      state_code: Kiev
                      country_code: UA
                    - id: 91627
                      name: Zhovkva
                      code: Zhovkva
                      state_id: 231
                      country_id: 1902
                      state_code: Lviv Oblast
                      country_code: UA
                    - id: 91628
                      name: Berdyansk
                      code: Berdyansk
                      state_id: 220
                      country_id: 1902
                      state_code: Zaporizhzhya Oblast
                      country_code: UA
                    - id: 91629
                      name: Bucha
                      code: Bucha
                      state_id: 233
                      country_id: 1902
                      state_code: Kiev
                      country_code: UA
                    - id: 91630
                      name: Chernihiv
                      code: Chernihiv
                      state_id: 244
                      country_id: 1902
                      state_code: Chernihiv
                      country_code: UA
                    - id: 91631
                      name: Irpin
                      code: Irpin
                      state_id: 233
                      country_id: 1902
                      state_code: Kiev
                      country_code: UA
                    - id: 91632
                      name: Stebnyk
                      code: Stebnyk
                      state_id: 231
                      country_id: 1902
                      state_code: Lviv Oblast
                      country_code: UA
                    - id: 91633
                      name: Zalishchyky
                      code: Zalishchyky
                      state_id: 224
                      country_id: 1902
                      state_code: Ternopil Oblast
                      country_code: UA
                    - id: 91634
                      name: Drohobych
                      code: Drohobych
                      state_id: 231
                      country_id: 1902
                      state_code: Lviv Oblast
                      country_code: UA
                    - id: 91635
                      name: Yany Kapu
                      code: Yany Kapu
                      state_id: 235
                      country_id: 1902
                      state_code: Crimea
                      country_code: UA
                    - id: 91636
                      name: Mukachevo
                      code: Mukachevo
                      state_id: 221
                      country_id: 1902
                      state_code: Transcarpathia
                      country_code: UA
                    - id: 91637
                      name: Kramatorsk
                      code: Kramatorsk
                      state_id: 241
                      country_id: 1902
                      state_code: Donetsk Oblast
                      country_code: UA
                    - id: 91638
                      name: Pobuzke
                      code: Pobuzke
                      state_id: 236
                      country_id: 1902
                      state_code: Kirovohrad Oblast
                      country_code: UA
                    - id: 91639
                      name: Bushtyno
                      code: Bushtyno
                      state_id: 221
                      country_id: 1902
                      state_code: Transcarpathia
                      country_code: UA
                    - id: 91640
                      name: Chornomors’k
                      code: Chornomors’k
                      state_id: 229
                      country_id: 1902
                      state_code: Odessa
                      country_code: UA
                    - id: 91641
                      name: Chortkiv
                      code: Chortkiv
                      state_id: 224
                      country_id: 1902
                      state_code: Ternopil Oblast
                      country_code: UA
                    - id: 91642
                      name: Reni
                      code: Reni
                      state_id: 229
                      country_id: 1902
                      state_code: Odessa
                      country_code: UA
                    - id: 91643
                      name: Myrnohrad
                      code: Myrnohrad
                      state_id: 241
                      country_id: 1902
                      state_code: Donetsk Oblast
                      country_code: UA
                    - id: 91644
                      name: Hayvoron
                      code: Hayvoron
                      state_id: 236
                      country_id: 1902
                      state_code: Kirovohrad Oblast
                      country_code: UA
                    - id: 91645
                      name: Yuzhnoukrayinsk
                      code: Yuzhnoukrayinsk
                      state_id: 230
                      country_id: 1902
                      state_code: Mykolayiv Oblast
                      country_code: UA
                    - id: 91646
                      name: Nizhyn
                      code: Nizhyn
                      state_id: 244
                      country_id: 1902
                      state_code: Chernihiv
                      country_code: UA
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(永久)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-157338489-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
