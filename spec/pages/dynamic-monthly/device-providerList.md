# 获取可用供应商列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/device/providerList:
    get:
      summary: 获取可用供应商列表
      deprecated: false
      description: 获取动态住宅可用供应商列表
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(期限)
      parameters:
        - name: access_token
          in: query
          description: 用户api key。<a href="/9518263m0" target="_blank">api key获取方式</a>
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: is_month
          in: query
          description: 流量是否限时:0=永久,1=期限<b>此处固定为：1</b>
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
                    type: array
                    items:
                      type: string
                required:
                  - code
                  - msg
                  - time
                  - data
              example:
                code: 1
                msg: 获取成功!
                time: '1748312417'
                data:
                  - '275'
                  - '4'
                  - '253'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595792-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
