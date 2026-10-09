# 获取剩余有效期内的带宽详情（运营商原生）

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/bandwidth/bandwidthNumDetail:
    get:
      summary: 获取剩余有效期内的带宽详情（运营商原生）
      deprecated: false
      description: 该接口数据会缓存120秒，请勿频繁请求该接口
      tags:
        - 用户IP子账号管理/静态住宅（运营商原生）时长子账号
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
          description: 产品类型:1=全球静态住宅
          required: true
          example: 1
          schema:
            type: integer
        - name: subAccount
          in: query
          description: 子账号
          required: true
          example: 69642
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
                  msg:
                    type: string
                  time:
                    type: string
                  data:
                    type: object
                    properties:
                      list:
                        type: array
                        items:
                          type: object
                          properties:
                            id:
                              type: integer
                            max_bandwidth:
                              type: integer
                              title: 峰值带宽
                            min_bandwidth:
                              type: integer
                              title: 保底带宽
                            start_time:
                              type: integer
                              title: 开始时间
                            end_time:
                              type: integer
                              title: 结束时间
                            start_time_text:
                              type: string
                              title: 开始时间
                            end_time_text:
                              type: string
                              title: 结束时间
                            create_time:
                              type: integer
                              title: 创建时间
                            update_time:
                              type: integer
                              title: 更新时间
                            create_time_text:
                              type: string
                              title: 创建时间
                            update_time_text:
                              type: string
                              title: 更新时间
                          x-apifox-orders:
                            - id
                            - max_bandwidth
                            - min_bandwidth
                            - start_time
                            - end_time
                            - start_time_text
                            - end_time_text
                            - create_time
                            - update_time
                            - create_time_text
                            - update_time_text
                        title: 在有效期内的详情情况
                      end_time:
                        type: integer
                        title: 子账号的结束时间
                      end_time_text:
                        type: string
                        title: 子账号的结束时间
                      current_max_bandwidth:
                        type: integer
                        title: 当前峰值带宽
                      current_min_bandwidth:
                        type: integer
                        title: 当前保底带宽
                      current_cycle_end_time:
                        type: integer
                        title: 当前带宽结束时间节点
                      current_cycle_end_time_text:
                        type: string
                        title: 当前带宽结束时间节点
                      cycle_min_bandwidth_maximum:
                        type: integer
                        title: 子账号结束周期内保底带宽的最大值
                    required:
                      - list
                      - end_time
                      - end_time_text
                      - current_max_bandwidth
                      - current_min_bandwidth
                      - current_cycle_end_time
                      - current_cycle_end_time_text
                      - cycle_min_bandwidth_maximum
                    x-apifox-orders:
                      - list
                      - end_time
                      - end_time_text
                      - current_max_bandwidth
                      - current_min_bandwidth
                      - current_cycle_end_time
                      - current_cycle_end_time_text
                      - cycle_min_bandwidth_maximum
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
              examples:
                '1':
                  summary: 成功示例
                  value:
                    code: 1
                    msg: 获取成功!
                    time: '1757560325'
                    data:
                      list:
                        - id: 11
                          max_bandwidth: 100
                          min_bandwidth: 5
                          start_time: 1757559806
                          end_time: 1758164604
                          start_time_text: '2025-09-11 11:03:26'
                          end_time_text: '2025-09-18 11:03:24'
                          create_time: 1757559806
                          update_time: 1757559806
                          create_time_text: '2025-09-11 11:03:26'
                          update_time_text: '2025-09-11 11:03:26'
                      end_time: 1758164604
                      end_time_text: '2025-09-18 11:03:24'
                      current_max_bandwidth: 100
                      current_min_bandwidth: 5
                      current_cycle_end_time: 1758164604
                      current_cycle_end_time_text: '2025-09-18 11:03:24'
                      cycle_min_bandwidth_maximum: 5
                '2':
                  summary: 成功示例
                  value:
                    code: 1
                    msg: 获取成功!
                    time: '1757560232'
                    data:
                      list:
                        - id: 11
                          max_bandwidth: 100
                          min_bandwidth: 5
                          start_time: 1757559806
                          end_time: 1758164604
                          start_time_text: '2025-09-11 11:03:26'
                          end_time_text: '2025-09-18 11:03:24'
                          create_time: 1757559806
                          update_time: 1757559806
                          create_time_text: '2025-09-11 11:03:26'
                          update_time_text: '2025-09-11 11:03:26'
                      end_time: 1758164604
                      end_time_text: '2025-09-18 11:03:24'
                      current_max_bandwidth: 100
                      current_min_bandwidth: 5
                      current_cycle_end_time: 1758164604
                      current_cycle_end_time_text: '2025-09-18 11:03:24'
                      current_cycle_min_bandwidth_maximum: 5
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-494467042-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
