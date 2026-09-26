# 获取静态住宅（非原生）对应城市列表

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
      summary: 获取静态住宅（非原生）对应城市列表
      deprecated: false
      description: 获取静态住宅（非原生）子账号时长对应城市列表
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
        - name: country_id
          in: query
          description: >-
            静态住宅国家id。国家id在<a target="_blank"
            href="/api-117919471">静态住宅（非原生）对应国家列表</a>接口获取
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
                time: '1767408752'
                data:
                  citys:
                    - id: 103965
                      name: Los Angeles
                      code: Los Angeles
                    - id: 103966
                      name: New York City
                      code: New York City
                    - id: 103969
                      name: Chino
                      code: Chino
                    - id: 103970
                      name: Chicago
                      code: Chicago
                    - id: 103971
                      name: Houston
                      code: Houston
                    - id: 103972
                      name: Phoenix
                      code: Phoenix
                    - id: 103973
                      name: Philadelphia
                      code: Philadelphia
                    - id: 103975
                      name: La Mirada
                      code: La Mirada
                    - id: 103995
                      name: Florida
                      code: Florida
                    - id: 103996
                      name: Corpus Christi
                      code: Corpus Christi
                    - id: 103997
                      name: Fort Lauderdale
                      code: Fort Lauderdale
                    - id: 103998
                      name: Oklahoma City
                      code: Oklahoma City
                    - id: 103999
                      name: Perris
                      code: Perris
                    - id: 104000
                      name: Rancho Santa Margarita
                      code: Rancho Santa Margarita
                    - id: 104001
                      name: San Angelo
                      code: San Angelo
                    - id: 104002
                      name: Seattle
                      code: Seattle
                    - id: 104003
                      name: Anaheim
                      code: Anaheim
                    - id: 104004
                      name: Beeville
                      code: Beeville
                    - id: 104005
                      name: Bradenton
                      code: Bradenton
                    - id: 104006
                      name: Cape Coral
                      code: Cape Coral
                    - id: 104007
                      name: Cleveland Heights
                      code: Cleveland Heights
                    - id: 104008
                      name: Fort Worth
                      code: Fort Worth
                    - id: 104009
                      name: New Orleans
                      code: New Orleans
                    - id: 104010
                      name: Palm Bay
                      code: Palm Bay
                    - id: 104011
                      name: Queens Village
                      code: Queens Village
                    - id: 104012
                      name: San Bernardino
                      code: San Bernardino
                    - id: 104013
                      name: Mobile
                      code: Mobile
                    - id: 104014
                      name: Albuquerque
                      code: Albuquerque
                    - id: 104015
                      name: Alice Acres
                      code: Alice Acres
                    - id: 104016
                      name: Altamonte Springs
                      code: Altamonte Springs
                    - id: 104017
                      name: Ann Arbor
                      code: Ann Arbor
                    - id: 104018
                      name: Apopka
                      code: Apopka
                    - id: 104019
                      name: Aransas Pass
                      code: Aransas Pass
                    - id: 104020
                      name: Asheville
                      code: Asheville
                    - id: 104021
                      name: Azusa
                      code: Azusa
                    - id: 104022
                      name: Barnstable
                      code: Barnstable
                    - id: 104023
                      name: Boca Raton
                      code: Boca Raton
                    - id: 104024
                      name: Bolingbrook
                      code: Bolingbrook
                    - id: 104025
                      name: Borough Park
                      code: Borough Park
                    - id: 104026
                      name: Brea
                      code: Brea
                    - id: 104027
                      name: Bushwick
                      code: Bushwick
                    - id: 104028
                      name: Cammack Village
                      code: Cammack Village
                    - id: 104029
                      name: Canajoharie
                      code: Canajoharie
                    - id: 104030
                      name: Cassopolis
                      code: Cassopolis
                    - id: 104031
                      name: Chicago Heights
                      code: Chicago Heights
                    - id: 104032
                      name: Clinton Township
                      code: Clinton Township
                    - id: 104033
                      name: Cocoa
                      code: Cocoa
                    - id: 104034
                      name: Collingdale
                      code: Collingdale
                    - id: 104035
                      name: Colorado Springs
                      code: Colorado Springs
                    - id: 104036
                      name: Conroe
                      code: Conroe
                    - id: 104037
                      name: Cookeville
                      code: Cookeville
                    - id: 104038
                      name: Coos Bay
                      code: Coos Bay
                    - id: 104039
                      name: Coral Springs
                      code: Coral Springs
                    - id: 104040
                      name: Costa Mesa
                      code: Costa Mesa
                    - id: 104041
                      name: Covina
                      code: Covina
                    - id: 104042
                      name: Deltona
                      code: Deltona
                    - id: 104043
                      name: Des Plaines
                      code: Des Plaines
                    - id: 104044
                      name: East Flatbush
                      code: East Flatbush
                    - id: 104045
                      name: East Harlem
                      code: East Harlem
                    - id: 104046
                      name: El Cajon
                      code: El Cajon
                    - id: 104047
                      name: Fort Collins
                      code: Fort Collins
                    - id: 104048
                      name: Fort Pierce
                      code: Fort Pierce
                    - id: 104049
                      name: Framingham
                      code: Framingham
                    - id: 104050
                      name: Gaithersburg
                      code: Gaithersburg
                    - id: 104051
                      name: Garfield Heights
                      code: Garfield Heights
                    - id: 104052
                      name: Guntersville
                      code: Guntersville
                    - id: 104053
                      name: Haines City
                      code: Haines City
                    - id: 104054
                      name: Harker Heights
                      code: Harker Heights
                    - id: 104055
                      name: Hemet
                      code: Hemet
                    - id: 104056
                      name: Hialeah
                      code: Hialeah
                    - id: 104057
                      name: Islamorada
                      code: Islamorada
                    - id: 104058
                      name: Kannapolis
                      code: Kannapolis
                    - id: 104059
                      name: Killeen
                      code: Killeen
                    - id: 104060
                      name: Laguna Niguel
                      code: Laguna Niguel
                    - id: 104061
                      name: Lake Elsinore
                      code: Lake Elsinore
                    - id: 104062
                      name: Lake Havasu City
                      code: Lake Havasu City
                    - id: 104063
                      name: Lecanto
                      code: Lecanto
                    - id: 104064
                      name: Lewes
                      code: Lewes
                    - id: 104065
                      name: Lillington
                      code: Lillington
                    - id: 104066
                      name: Lutz
                      code: Lutz
                    - id: 104067
                      name: Mahopac
                      code: Mahopac
                    - id: 104068
                      name: Manteca
                      code: Manteca
                    - id: 104069
                      name: Mariners Harbor
                      code: Mariners Harbor
                    - id: 104070
                      name: Maspeth
                      code: Maspeth
                    - id: 104071
                      name: Methuen
                      code: Methuen
                    - id: 104072
                      name: Mililani Town
                      code: Mililani Town
                    - id: 104073
                      name: Moreno Valley
                      code: Moreno Valley
                    - id: 104074
                      name: Mountlake Terrace
                      code: Mountlake Terrace
                    - id: 104075
                      name: Murrells Inlet
                      code: Murrells Inlet
                    - id: 104076
                      name: Murrieta
                      code: Murrieta
                    - id: 104077
                      name: Naperville
                      code: Naperville
                    - id: 104078
                      name: New Braunfels
                      code: New Braunfels
                    - id: 104079
                      name: Newport News
                      code: Newport News
                    - id: 104080
                      name: New Port Richey
                      code: New Port Richey
                    - id: 104081
                      name: New Rochelle
                      code: New Rochelle
                    - id: 104082
                      name: Niagara Falls
                      code: Niagara Falls
                    - id: 104083
                      name: North Olmsted
                      code: North Olmsted
                    - id: 104084
                      name: Orchard Lake
                      code: Orchard Lake
                    - id: 104085
                      name: Orland Park
                      code: Orland Park
                    - id: 104086
                      name: Ormond Beach
                      code: Ormond Beach
                    - id: 104087
                      name: Ossining
                      code: Ossining
                    - id: 104088
                      name: Overland Park
                      code: Overland Park
                    - id: 104089
                      name: Oxnard
                      code: Oxnard
                    - id: 104090
                      name: Ozone Park
                      code: Ozone Park
                    - id: 104091
                      name: Palm Desert
                      code: Palm Desert
                    - id: 104092
                      name: Parsippany
                      code: Parsippany
                    - id: 104093
                      name: Pembroke Pines
                      code: Pembroke Pines
                    - id: 104094
                      name: Perth Amboy
                      code: Perth Amboy
                    - id: 104095
                      name: Pharr
                      code: Pharr
                    - id: 104096
                      name: Pompano Beach
                      code: Pompano Beach
                    - id: 104097
                      name: Port Saint Lucie
                      code: Port Saint Lucie
                    - id: 104098
                      name: Pottawattamie Park
                      code: Pottawattamie Park
                    - id: 104099
                      name: Rancho Cucamonga
                      code: Rancho Cucamonga
                    - id: 104100
                      name: Reedley
                      code: Reedley
                    - id: 104101
                      name: Rio Grande City
                      code: Rio Grande City
                    - id: 104102
                      name: Rochester Hills
                      code: Rochester Hills
                    - id: 104103
                      name: Round Lake Beach
                      code: Round Lake Beach
                    - id: 104104
                      name: Salt Lake City
                      code: Salt Lake City
                    - id: 104105
                      name: San Fernando
                      code: San Fernando
                    - id: 104106
                      name: San Leandro
                      code: San Leandro
                    - id: 104107
                      name: Santa Barbara
                      code: Santa Barbara
                    - id: 104108
                      name: Santa Clarita
                      code: Santa Clarita
                    - id: 104109
                      name: Sarasota
                      code: Sarasota
                    - id: 104110
                      name: Sayreville
                      code: Sayreville
                    - id: 104111
                      name: Schaumburg
                      code: Schaumburg
                    - id: 104112
                      name: Sheepshead Bay
                      code: Sheepshead Bay
                    - id: 104113
                      name: Shepherdsville
                      code: Shepherdsville
                    - id: 104114
                      name: Shreveport
                      code: Shreveport
                    - id: 104115
                      name: Sicklerville
                      code: Sicklerville
                    - id: 104116
                      name: Sioux Falls
                      code: Sioux Falls
                    - id: 104117
                      name: Skokie
                      code: Skokie
                    - id: 104118
                      name: Slatington
                      code: Slatington
                    - id: 104119
                      name: South San Francisco
                      code: South San Francisco
                    - id: 104120
                      name: St. Louis
                      code: St. Louis
                    - id: 104121
                      name: St. Marys
                      code: St. Marys
                    - id: 104122
                      name: St. Petersburg
                      code: St. Petersburg
                    - id: 104123
                      name: Stonecrest
                      code: Stonecrest
                    - id: 104124
                      name: Stroudsburg
                      code: Stroudsburg
                    - id: 104125
                      name: Temecula
                      code: Temecula
                    - id: 104126
                      name: Thibodaux
                      code: Thibodaux
                    - id: 104127
                      name: Tinley Park
                      code: Tinley Park
                    - id: 104128
                      name: Toms River
                      code: Toms River
                    - id: 104129
                      name: Tulsa
                      code: Tulsa
                    - id: 104130
                      name: Turlock
                      code: Turlock
                    - id: 104131
                      name: Universal City
                      code: Universal City
                    - id: 104132
                      name: Vallejo
                      code: Vallejo
                    - id: 104133
                      name: Vancouver
                      code: Vancouver
                    - id: 104134
                      name: Victorville
                      code: Victorville
                    - id: 104135
                      name: Virginia Beach
                      code: Virginia Beach
                    - id: 104136
                      name: Weslaco
                      code: Weslaco
                    - id: 104137
                      name: West Babylon
                      code: West Babylon
                    - id: 104138
                      name: West Covina
                      code: West Covina
                    - id: 104139
                      name: West Palm Beach
                      code: West Palm Beach
                    - id: 104140
                      name: Willingboro
                      code: Willingboro
                    - id: 104141
                      name: Wimauma
                      code: Wimauma
                    - id: 104142
                      name: Windber
                      code: Windber
                    - id: 104143
                      name: Winter Garden
                      code: Winter Garden
                    - id: 104144
                      name: Yakima
                      code: Yakima
                    - id: 104145
                      name: Yuba City
                      code: Yuba City
                    - id: 104146
                      name: Yucaipa
                      code: Yucaipa
                    - id: 104147
                      name: Asheboro
                      code: Asheboro
                    - id: 104148
                      name: Baytown
                      code: Baytown
                    - id: 104149
                      name: Bethania
                      code: Bethania
                    - id: 104150
                      name: Blackshear
                      code: Blackshear
                    - id: 104151
                      name: Calumet City
                      code: Calumet City
                    - id: 104152
                      name: Canarsie
                      code: Canarsie
                    - id: 104153
                      name: Dale City
                      code: Dale City
                    - id: 104154
                      name: Daytona Beach
                      code: Daytona Beach
                    - id: 104155
                      name: Eagle Pass
                      code: Eagle Pass
                    - id: 104156
                      name: Federal Way
                      code: Federal Way
                    - id: 104157
                      name: Greenburgh
                      code: Greenburgh
                    - id: 104158
                      name: Hot Springs National Park
                      code: Hot Springs National Park
                    - id: 104159
                      name: Kennewick
                      code: Kennewick
                    - id: 104160
                      name: Lake Darby
                      code: Lake Darby
                    - id: 104161
                      name: League City
                      code: League City
                    - id: 104162
                      name: Lehighton
                      code: Lehighton
                    - id: 104163
                      name: Lenoir
                      code: Lenoir
                    - id: 104164
                      name: Lubbock
                      code: Lubbock
                    - id: 104165
                      name: Mcallen
                      code: Mcallen
                    - id: 104166
                      name: Milpitas
                      code: Milpitas
                    - id: 104167
                      name: Morehead City
                      code: Morehead City
                    - id: 104168
                      name: Mount Clemens
                      code: Mount Clemens
                    - id: 104169
                      name: Mount Pocono
                      code: Mount Pocono
                    - id: 104170
                      name: Nampa
                      code: Nampa
                    - id: 104171
                      name: North Tonawanda
                      code: North Tonawanda
                    - id: 104172
                      name: Okeechobee
                      code: Okeechobee
                    - id: 104173
                      name: Palm Coast
                      code: Palm Coast
                    - id: 104174
                      name: Port Ewen
                      code: Port Ewen
                    - id: 104175
                      name: Port Neches
                      code: Port Neches
                    - id: 104176
                      name: Redondo Beach
                      code: Redondo Beach
                    - id: 104177
                      name: San Bruno
                      code: San Bruno
                    - id: 104178
                      name: San Luis Obispo
                      code: San Luis Obispo
                    - id: 104179
                      name: Schenectady
                      code: Schenectady
                    - id: 104180
                      name: Shackle Island
                      code: Shackle Island
                    - id: 104181
                      name: Simi Valley
                      code: Simi Valley
                    - id: 104182
                      name: Southaven
                      code: Southaven
                    - id: 104183
                      name: South Milwaukee
                      code: South Milwaukee
                    - id: 104184
                      name: South Vineland
                      code: South Vineland
                    - id: 104185
                      name: Strongsville
                      code: Strongsville
                    - id: 104186
                      name: Tifton
                      code: Tifton
                    - id: 104187
                      name: Trotwood
                      code: Trotwood
                    - id: 104188
                      name: Tuscaloosa
                      code: Tuscaloosa
                    - id: 104189
                      name: Valrico
                      code: Valrico
                    - id: 104190
                      name: Atascocita
                      code: Atascocita
                    - id: 104191
                      name: Bothell
                      code: Bothell
                    - id: 104192
                      name: Camarillo
                      code: Camarillo
                    - id: 104193
                      name: Canonsburg
                      code: Canonsburg
                    - id: 104194
                      name: Centereach
                      code: Centereach
                    - id: 104195
                      name: Clewiston
                      code: Clewiston
                    - id: 104196
                      name: Coeur D'Alene
                      code: Coeur D'Alene
                    - id: 104197
                      name: Commack
                      code: Commack
                    - id: 104198
                      name: Conyers
                      code: Conyers
                    - id: 104199
                      name: Dearborn Heights
                      code: Dearborn Heights
                    - id: 104200
                      name: Deerfield Beach
                      code: Deerfield Beach
                    - id: 104201
                      name: Escondido
                      code: Escondido
                    - id: 104202
                      name: Hilton Head Island
                      code: Hilton Head Island
                    - id: 104203
                      name: Idaho Falls
                      code: Idaho Falls
                    - id: 104204
                      name: Joppatowne
                      code: Joppatowne
                    - id: 104205
                      name: Kapolei
                      code: Kapolei
                    - id: 104206
                      name: Longmont
                      code: Longmont
                    - id: 104207
                      name: Mcalester
                      code: Mcalester
                    - id: 104208
                      name: Merced
                      code: Merced
                    - id: 104209
                      name: Merritt Island
                      code: Merritt Island
                    - id: 104210
                      name: Mooers
                      code: Mooers
                    - id: 104211
                      name: Moorpark
                      code: Moorpark
                    - id: 104212
                      name: Mott Haven
                      code: Mott Haven
                    - id: 104213
                      name: Oviedo
                      code: Oviedo
                    - id: 104214
                      name: Peekskill
                      code: Peekskill
                    - id: 104215
                      name: Pflugerville
                      code: Pflugerville
                    - id: 104216
                      name: Rahway
                      code: Rahway
                    - id: 104217
                      name: Rosenberg
                      code: Rosenberg
                    - id: 104218
                      name: Royse City
                      code: Royse City
                    - id: 104219
                      name: Santa Paula
                      code: Santa Paula
                    - id: 104220
                      name: Scottsbluff
                      code: Scottsbluff
                    - id: 104221
                      name: Suitland
                      code: Suitland
                    - id: 104222
                      name: Volta
                      code: Volta
                    - id: 104223
                      name: ‘ewa Gentry
                      code: ‘ewa Gentry
                    - id: 104224
                      name: Citrus
                      code: Citrus
                    - id: 104225
                      name: Mount Prospect
                      code: Mount Prospect
                    - id: 104226
                      name: Panama City Beach
                      code: Panama City Beach
                    - id: 104227
                      name: Waukesha
                      code: Waukesha
                    - id: 104228
                      name: Waxahachie
                      code: Waxahachie
                    - id: 104229
                      name: East Tulare Villa
                      code: East Tulare Villa
                    - id: 104284
                      name: San Francisco
                      code: San Francisco
                    - id: 104285
                      name: Las Vegas
                      code: Las Vegas
                    - id: 104288
                      name: Boston
                      code: Boston
                    - id: 104289
                      name: Dallas
                      code: Dallas
                    - id: 104290
                      name: Washington
                      code: Washington
                    - id: 104291
                      name: Washington
                      code: Washington
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（非原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-117416129-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
