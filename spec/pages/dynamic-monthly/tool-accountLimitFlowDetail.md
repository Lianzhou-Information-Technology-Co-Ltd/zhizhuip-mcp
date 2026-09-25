# 获取动态住宅子账号上限配置

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/tool/accountLimitFlowDetail:
    get:
      summary: 获取动态住宅子账号上限配置
      deprecated: false
      description: 获取动态住宅子账号流量上限设置信息
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(期限)
      parameters:
        - name: access_token
          in: query
          description: 用户token。用户登录之后，获取token
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: account
          in: query
          description: 子账号id
          required: true
          example: 560
          schema:
            type: integer
        - name: type
          in: query
          description: 产品类别，此处固定为0
          required: true
          example: 0
          schema:
            type: integer
        - name: status
          in: query
          description: 计费模式，此处固定为0
          required: true
          example: 0
          schema:
            type: integer
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
                    description: 错误说明
                  time:
                    type: string
                    description: 响应时间戳
                  data:
                    type: object
                    properties:
                      account:
                        type: string
                      limit_flow:
                        type: integer
                      use_flow:
                        type: number
                      cycle:
                        type: string
                      disabled:
                        type: string
                      createtime:
                        type: string
                      updatetime:
                        type: string
                    required:
                      - account
                      - limit_flow
                      - use_flow
                      - cycle
                      - disabled
                      - createtime
                      - updatetime
                required:
                  - code
                  - msg
                  - time
                  - data
              example:
                code: 1
                msg: 子账号流量设置获取成功!
                time: '1752213565'
                data:
                  account: '560'
                  limit_flow: 2
                  use_flow: 0.03
                  cycle: '1'
                  disabled: '0'
                  createtime: '2025-07-11 13:24:16'
                  updatetime: '2025-07-11 13:27:10'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595795-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
