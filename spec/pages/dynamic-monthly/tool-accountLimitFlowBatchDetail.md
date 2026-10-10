# 批量获取动态住宅子账号上限配置

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/tool/accountLimitFlowBatchDetail:
    get:
      summary: 批量获取动态住宅子账号上限配置
      deprecated: false
      description: 获取动态住宅子账号流量上限设置信息
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
        - name: accounts
          in: query
          description: 子账号id
          required: true
          example: 5611
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
        - name: page
          in: query
          description: ''
          required: false
          example: 1
          schema:
            type: integer
        - name: pagesize
          in: query
          description: 分页数量，最大值100
          required: false
          example: 100
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
                    type: array
                    items:
                      type: object
                      properties:
                        account:
                          type: integer
                        limit_flow:
                          type: string
                        use_flow:
                          type: integer
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
                msg: 批量查询成功!
                time: '1752216108'
                data:
                  - account: 1
                    limit_flow: '2'
                    use_flow: 1
                    cycle: '0'
                    disabled: '0'
                    createtime: '2025-07-11 13:24:16'
                    updatetime: '2025-07-11 14:14:32'
                  - account: 2
                    limit_flow: '3'
                    use_flow: 0
                    cycle: '1'
                    disabled: '0'
                    createtime: '2025-07-11 13:33:03'
                    updatetime: '2025-07-11 13:55:05'
                  - account: 3
                    limit_flow: '1'
                    use_flow: 0
                    cycle: '1'
                    disabled: '0'
                    createtime: '2025-07-11 13:33:03'
                    updatetime: '2025-07-11 13:55:07'
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(期限)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-340595796-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
