# 批量删除动态住宅子账号信息

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/device/accountDeleteList:
    delete:
      summary: 批量删除动态住宅子账号信息
      deprecated: false
      description: 批量删除动态住宅子账号信息
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(期限)
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
                  description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。此处固定为：0
                  example: 0
                  type: integer
                status:
                  description: 计费模式：0=按流量，1=按时长，2=按ip数。此处固定为：0
                  example: 0
                  type: integer
                ids:
                  description: 子账号id集，以英文逗号连接
                  example: 1,2,3
                  type: string
                is_month:
                  type: integer
                  description: 流量是否限时:0=永久,1=期限<b>此处固定为：1</b>
                  example: 1
              required:
                - access_token
                - type
                - status
                - ids
                - is_month
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
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595782-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
