# 购买静态住宅（IPV6）时长IP

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/product_order/createIpv6Order:
    post:
      summary: 购买静态住宅（IPV6）时长IP
      deprecated: false
      description: 购买静态住宅（ipv6）时长IP。用户必须完成邮箱或者手机验证，以及实名验证之后，才能购买
      tags:
        - 用户IP子账号管理/静态住宅（IPV6）时长子账号
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
                  description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。<b>此处固定为：1</b>
                  example: 1
                  type: integer
                status:
                  description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：1</b>
                  example: 1
                  type: integer
                num:
                  description: 需要购买的子账号数量。范围：1-5000之间
                  example: 4096
                  type: integer
                country:
                  description: >-
                    静态住宅国家编码code。<a target="_blank"
                    href="/api-244532508">静态住宅（IPV6）对应国家列表</a>可获取国家编码。支持的静态住宅国家列表可在<a
                    href="/api-239401043" target="_blank">静态住宅（IPV6）国家</a>查询
                  example: US
                  type: string
                timelen:
                  description: 时长计费类型：0=7天，1=30天，2=90天，3=180天，4=360天
                  example: 1
                  type: integer
                agree:
                  description: 协议：SOCKS5，HTTP，HTTPS
                  example: SOCKS5
                  type: string
                city:
                  description: >-
                    静态住宅城市名称。在<a target="_blank"
                    href="/api-244532509">静态住宅（IPV6）对应城市列表</a>可获取城市名称。不传默认随机。
                  example: Los Angeles
                  type: string
                verder_order_id:
                  description: >-
                    外部请求订单id。非必填。如果传递，则需要每次生成新订单时，这个verder_order_id一定要<b>唯一</b>。否则返回verder_order_id<b>缓存生成的订单数据</b>。缓存有效期4小时。
                  example: 20231215aabbccddee
                  type: string
                use_random_username:
                  description: 创建时是否使用随机账号和密码。0=不使用，1=使用
                  example: 1
                  type: integer
                native:
                  type: integer
                  description: 原生:0=非原生,1=本土原生。<b>此处固定为：1</b>
                  example: 1
                ip_str:
                  description: 指定v6段
                  example: 2a13:dac0
                  type: string
                bandwidth_num:
                  type: integer
                  example: 10
                remark:
                  example: ''
                  type: string
              required:
                - access_token
                - type
                - status
                - num
                - country
                - timelen
                - agree
                - native
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
                  data:
                    type: object
                    properties:
                      subAccounts:
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
                            native:
                              type: string
                              description: 是否原生。0=广播，1=本土原生，2=运营商原生，空值为未指定。
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
                            - native
                            - bindUser
                            - bindPassword
                            - countdown
                            - createtime
                            - state
                            - city
                            - bill
                            - countryName
                            - status
                          required:
                            - native
                        description: 新建的子账号数组
                      orderId:
                        type: string
                        description: 订单id。即：订单编号
                    required:
                      - subAccounts
                      - orderId
                    x-apifox-orders:
                      - subAccounts
                      - orderId
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
                msg: 购买成功
                time: '1697513125'
                data:
                  subAccounts:
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
                      native: 1
                      expiresIn: 1729147431
                      bindUser: demo-22
                      bindPassword: demo
                      countdown: 30.0天
                      createtime: '1970-01-01 08:00:00'
                      state: ''
                      city: ''
                      bill: 0
                      countryName: 美国
                      status: 1
                  orderId: '20241218174853186157934666'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（IPV6）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-244532502-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
