# 设置动态住宅子账号流量上限

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/tool/accountLimitFlowSet:
    put:
      summary: 设置动态住宅子账号流量上限
      deprecated: false
      description: >-
        设置子账号的流量上限，示例：设置周期为天上限为10G，第一天达到10G后会断开子账号的所有请求，后第二天会允许重新连接，达到子账号每天最大可使用10G的限制。因各周期类型均设置可能存在互斥，为避免用户管理混淆，同一个子账号只允许设置一个周期限制
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
        - name: account
          in: query
          description: 子账号id
          required: true
          example: 5601
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
        - name: cycle
          in: query
          description: 限制周期:0=每天,1=每周,2=每月,3=每季度,4=每年,5=永久
          required: true
          example: 0
          schema:
            type: integer
        - name: limit_flow
          in: query
          description: 限制流量:G, 传 0 表示删除该子账号的流量限制
          required: true
          example: 3
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
                    type: 'null'
                required:
                  - code
                  - msg
                  - time
                  - data
              example:
                code: 1
                msg: 设置成功!
                time: '1752214470'
                data: null
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595793-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
