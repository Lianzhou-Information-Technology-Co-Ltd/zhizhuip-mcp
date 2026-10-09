# 获取动态住宅子账号流量

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/total/subAccountFlow:
    get:
      summary: 获取动态住宅子账号流量
      deprecated: false
      description: 获取动态住宅子账号流量记录
      tags:
        - 用户IP子账号管理/动态住宅流量子账号(永久)
      parameters:
        - name: access_token
          in: query
          description: 用户api key。<a href="/9518263m0" target="_blank">api key获取方式</a>
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: id
          in: query
          description: 子账号id
          required: true
          example: 135
          schema:
            type: integer
        - name: start_date
          in: query
          description: 查询开始时间。格式 YYYY-MM-DD，区间最多 30 天，结束日期不能晚于今天
          required: true
          example: '2025-07-21'
          schema:
            type: string
        - name: end_date
          in: query
          description: 查询结束时间。格式 YYYY-MM-DD，区间最多 30 天，结束日期不能晚于今天
          required: true
          example: '2025-07-23'
          schema:
            type: string
        - name: spec
          in: query
          description: 供应商id
          required: false
          example: 4
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
                      rows:
                        type: array
                        items:
                          type: object
                          properties:
                            time:
                              type: string
                            flow:
                              type: string
                              description: 消耗流量(单位MB)
                          required:
                            - time
                            - flow
                          x-apifox-orders:
                            - time
                            - flow
                      total:
                        type: integer
                    required:
                      - rows
                      - total
                    x-apifox-orders:
                      - rows
                      - total
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
                msg: 获取成功!
                time: '1753240306'
                data:
                  rows:
                    - time: '2025-07-18'
                      flow: '8407.17'
                    - time: '2025-07-19'
                      flow: '4844.14'
                    - time: '2025-07-20'
                      flow: '5094.96'
                    - time: '2025-07-21'
                      flow: '8336.39'
                    - time: '2025-07-22'
                      flow: '9700.24'
                    - time: '2025-07-23'
                      flow: '2967.32'
                  total: 6
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/动态住宅流量子账号(永久)
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-248039865-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
