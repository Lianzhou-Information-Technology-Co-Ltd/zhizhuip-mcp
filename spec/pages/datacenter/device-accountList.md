# 获取数据中心时长子账号列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/device/accountList:
    get:
      summary: 获取数据中心时长子账号列表
      deprecated: false
      description: 获取数据中心IP子账号列表
      tags:
        - 用户IP子账号管理/数据中心时长子账号
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
          description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：2</b>
          required: true
          example: 2
          schema:
            type: integer
        - name: status
          in: query
          description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：1</b>
          required: true
          example: 1
          schema:
            type: integer
        - name: page
          in: query
          description: 当前页数
          required: true
          example: 1
          schema:
            type: integer
        - name: pagesize
          in: query
          description: 每页显示数量。每页最大100条数据
          required: true
          example: 10
          schema:
            type: integer
        - name: customUsername
          in: query
          description: 自定义账号
          required: false
          example: ''
          schema:
            type: string
        - name: ids
          in: query
          description: 子账号id集合，多个以英文逗号连接
          required: false
          example: 13,12,8
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
                      total:
                        type: integer
                      rows:
                        type: array
                        items:
                          type: object
                          properties:
                            id:
                              type: string
                              description: 子账号id
                            is_diff:
                              type: integer
                              description: 是否去重。静态时长IP用不到
                            agree:
                              type: string
                              description: '协议，socks5, https, http '
                            country:
                              type: string
                              description: 国家代码。比如：US
                            ip:
                              type: string
                              description: 出口IP
                            target:
                              type: string
                              description: 代理主机（加速通道）
                            port:
                              type: integer
                              description: 端口
                            username:
                              type: string
                              description: 子账号用户名
                            password:
                              type: string
                              description: 子账号密码
                            is_bind:
                              type: string
                              description: 是否设置了子账号映射。0=否，1=是。
                            remark:
                              type: string
                              description: 备注
                            bindUser:
                              type: string
                              description: 子账号用户名。同username
                            bindPassword:
                              type: string
                              description: 子账号密码。同password
                            countdown:
                              type: string
                              description: 到期天数
                            createtime:
                              type: string
                              description: 创建时间
                            state:
                              type: string
                              description: 州/省
                            city:
                              type: string
                              description: 城市
                            bill:
                              type: integer
                              description: 使用流量，静态时长IP显示0
                            countryName:
                              type: string
                              description: 国家中文名称
                            status:
                              type: integer
                              description: 子账号状态。1=正常，2=即将过期，3=已过期
                            use_bill:
                              type: string
                              description: 静态时长IP用不到
                            is_renew:
                              type: string
                              description: 是否续费，0=不续费，1=续费
                            expiresIn:
                              type: integer
                              description: 到期时间戳
                          required:
                            - id
                            - is_diff
                            - agree
                            - country
                            - ip
                            - target
                            - port
                            - username
                            - password
                            - is_bind
                            - remark
                            - bindUser
                            - bindPassword
                            - countdown
                            - createtime
                            - state
                            - city
                            - bill
                            - countryName
                            - status
                            - use_bill
                            - is_renew
                            - expiresIn
                          x-apifox-orders:
                            - id
                            - is_diff
                            - agree
                            - country
                            - ip
                            - target
                            - port
                            - username
                            - password
                            - is_bind
                            - remark
                            - bindUser
                            - bindPassword
                            - countdown
                            - expiresIn
                            - createtime
                            - state
                            - city
                            - bill
                            - countryName
                            - status
                            - use_bill
                            - is_renew
                        description: 子账号列表
                      baseflow:
                        type: integer
                        description: 基准流量。静态时长IP用不到
                      countryList:
                        type: array
                        items:
                          type: object
                          properties:
                            country:
                              type: string
                            countryName:
                              type: string
                          required:
                            - country
                            - countryName
                          x-apifox-orders:
                            - country
                            - countryName
                        description: 当前列表中的国家
                    required:
                      - total
                      - rows
                      - baseflow
                      - countryList
                    x-apifox-orders:
                      - total
                      - rows
                      - baseflow
                      - countryList
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
                msg: 获取成功
                time: '1697514828'
                data:
                  total: 17
                  rows:
                    - id: '22'
                      is_diff: 0
                      agree: SOCKS5
                      country: US
                      ip: 127.0.0.1
                      target: demo.demo.com
                      port: 5001
                      username: demo-22
                      password: demo
                      is_bind: 否
                      remark: ''
                      bindUser: demo-22
                      bindPassword: demo
                      countdown: 30.0天
                      expiresIn: 1723514861
                      createtime: '2023-10-17 11:25:28'
                      state: ''
                      city: ''
                      bill: 0
                      countryName: 美国
                      status: 1
                      use_bill: '0.00'
                      is_renew: '0'
                  baseflow: 0
                  countryList:
                    - country: US
                      countryName: 美国
                    - country: SG
                      countryName: 新加坡
                    - country: RU
                      countryName: 俄罗斯
                    - country: DE
                      countryName: 德国
                    - country: FR
                      countryName: 法国
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/数据中心时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-116480641-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
