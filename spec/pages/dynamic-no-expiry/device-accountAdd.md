# 添加动态住宅流量子账号

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/device/accountAdd:
    post:
      summary: 添加动态住宅流量子账号
      deprecated: false
      description: 添加动态住宅流量子账号
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(永久)
      parameters: []
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                access_token:
                  description: >-
                    用户api key。<a href="/9518263m0" target="_blank">api
                    key获取方式</a>
                  example: '{{access_token}}'
                  type: string
                type:
                  description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：0</b>
                  example: 0
                  type: integer
                num:
                  description: 需要生成的子账号数量
                  example: 1
                  type: integer
                changeInterval:
                  description: 切换间隔，5-120分钟可选
                  example: 5
                  type: integer
                agree:
                  description: 协议：SOCKS5，HTTP，HTTPS
                  example: SOCKS5
                  type: string
                country:
                  description: >-
                    国家code,多个以逗号隔开:'US,JP'。国家编码可根据<a href="/doc-3095649"
                    target="_blank">国家编码查询文档</a>得到。支持的动态国家列表可在<a
                    href="/api-155476871" target="_blank">动态住宅国家</a>查询
                  example: US
                  type: string
                state:
                  description: 州/省份,多个以逗号隔开:'anhui,jiangsu'
                  example: ''
                  type: string
                city:
                  description: 城市code
                  example: ''
                  type: string
                url:
                  description: 业务网址
                  example: ''
                  type: string
                use_random_username:
                  description: 创建时是否使用随机账号和密码。0=不使用，1=使用
                  example: 0
                  type: integer
                remark:
                  description: 备注
                  example: ''
                  type: string
                spec:
                  type: integer
                  description: 指定池
                  example: 4
              required:
                - access_token
                - type
                - num
                - changeInterval
                - agree
                - country
            examples: {}
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
                    description: 执行时间戳
                  data:
                    type: array
                    items:
                      type: object
                      properties:
                        password:
                          type: string
                          x-apifox-mock: 账号
                          description: 账号
                        username:
                          type: string
                          x-apifox-mock: 密码
                          description: 密码
                        id:
                          type: integer
                          x-apifox-mock: id
                          description: id
                        bindUser:
                          type: string
                        disabled:
                          type: integer
                          description: 是否超过流量限制
                        bindPassword:
                          type: string
                        createTime:
                          type: string
                          x-apifox-mock: 添加时间
                          description: 添加时间
                        port:
                          type: integer
                          x-apifox-mock: 端口
                          description: 端口
                        agree:
                          type: string
                        target:
                          type: string
                        changeInterval:
                          type: integer
                          x-apifox-mock: 切换周期
                          description: 切换周期
                        expiresIn:
                          type: integer
                          x-apifox-mock: 结束时间
                          description: 结束时间
                        ip:
                          type: string
                          x-apifox-mock: ip
                        bill:
                          type: integer
                          x-apifox-mock: 使用流量
                          description: '使用流量 '
                        is_diff:
                          type: integer
                          x-apifox-mock: 是否去重
                          description: 是否去重
                        country:
                          type: string
                          x-apifox-mock: 城市
                          description: 城市
                        countryName:
                          type: string
                        state:
                          type: string
                        remark:
                          type: string
                        city:
                          type: string
                      x-apifox-orders:
                        - password
                        - username
                        - id
                        - bindUser
                        - disabled
                        - bindPassword
                        - createTime
                        - port
                        - agree
                        - target
                        - changeInterval
                        - expiresIn
                        - ip
                        - bill
                        - is_diff
                        - country
                        - countryName
                        - state
                        - remark
                        - city
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
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(永久)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-116480627-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
