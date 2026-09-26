# 批量开关静态住宅（运营商原生）ip端口连接状态

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/device/portEnableUpdateList:
    put:
      summary: 批量开关静态住宅（运营商原生）ip端口连接状态
      deprecated: false
      description: 自定义静态住宅（运营商原生）时长IP子账号用户名和密码
      tags:
        - 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      parameters: []
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                access_token:
                  description: 用户token。用户登录之后，获取token
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
                native:
                  type: integer
                  description: 原生类别:0=非原生，1=原生，2=运营商原生。<b>此处固定为：2</b>
                  example: 2
                ids:
                  description: 子账号id集合,多个以英文逗号分隔。单次最多200个
                  example: 1,2,3
                  type: string
                use_ip_port:
                  type: integer
                  description: 开关状态:0=关闭，1=开启。
                  example: 1
              required:
                - access_token
                - type
                - status
                - native
                - ids
                - use_ip_port
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
                    type: 'null'
                x-apifox-orders:
                  - code
                  - msg
                  - time
                  - data
                required:
                  - code
                  - msg
                  - time
                  - data
              example:
                code: 1
                msg: 修改成功！
                time: '2005-03-27 13:48:34'
                data: null
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-494467039-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
