# 子账号白名单读取

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/tool/getSubAccountWhiteList:
    get:
      summary: 子账号白名单读取
      deprecated: false
      description: ''
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(永久)
      parameters:
        - name: type
          in: query
          description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心。此处固定为：0
          required: true
          example: 0
          schema:
            type: integer
        - name: status
          in: query
          description: 计费模式：0=按流量，1=按时长，2=按ip数。<b>此处固定为：0</b>
          required: true
          example: 0
          schema:
            type: integer
        - name: is_month
          in: query
          description: 流量是否限时:0=永久,1=期限<b>此处固定为：0</b>
          required: true
          example: 0
          schema:
            type: integer
        - name: id
          in: query
          description: 子账号id
          required: false
          example: 1
          schema:
            type: integer
        - name: token
          in: header
          description: 用户api key。<a href="/9518263m0" target="_blank">api key获取方式</a>
          required: false
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
                properties: {}
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(永久)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-358416263-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
