# 获取优惠券列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/conpons/conponList:
    get:
      summary: 获取优惠券列表
      deprecated: false
      description: |-
        不同产品查询条件： 
        1）动态住宅流量优惠券查询：type = 0，status = 0 
        2）静态住宅时长优惠券查询：type = 1，status = 1 
        3）数据中心时长优惠券查询：type = 2，status = 1
      tags:
        - 工具管理
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
          description: 套餐类型：0=全球动态住宅，1=全球静态住宅，2=全球数据中心
          required: true
          example: 2
          schema:
            type: integer
        - name: status
          in: query
          description: 计费模式：0=按流量，1=按时长，2=按ip数。获取<b>静态住宅时长和数据中心</b>优惠券时固定为：1
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
                      type: object
                      properties:
                        conpon_id:
                          type: integer
                          description: 优惠券id
                        con_name:
                          type: string
                          description: 优惠券名称
                        time_ip_remaining:
                          type: integer
                          description: 优惠购买时长子账号剩余个数。比如：显示98，则还是98个子账号可以优惠购买
                        flow_remaining:
                          type: integer
                          description: 优惠购买流量剩余（GB）。比如：显示98，则还是98GB流量，可以优惠购买
                      required:
                        - conpon_id
                        - con_name
                        - time_ip_remaining
                        - flow_remaining
                      x-apifox-orders:
                        - conpon_id
                        - con_name
                        - time_ip_remaining
                        - flow_remaining
                    description: 优惠券列表
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
      x-apifox-folder: 工具管理
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-116480625-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
