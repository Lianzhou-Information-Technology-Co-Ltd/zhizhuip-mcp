# 子账号带宽趋势查询（运营商原生）

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/bandwidth/monitoringTrend:
    get:
      summary: 子账号带宽趋势查询（运营商原生）
      deprecated: false
      description: 返回静态住宅（运营商原生）子账号最近1小时的带宽变化趋势
      tags:
        - 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      parameters:
        - name: type
          in: query
          description: 产品类型：1=全球静态住宅
          required: true
          example: 1
          schema:
            type: integer
        - name: trend_type
          in: query
          description: 趋势类型:1=实时,2=历史(历史周期时需要传入起止时间)
          required: true
          example: 2
          schema:
            type: integer
        - name: subAccount
          in: query
          description: 子账号id
          required: true
          example: 69607
          schema:
            type: integer
        - name: startTime
          in: query
          description: 开始时间戳
          required: false
          example: 1756656000
          schema:
            type: integer
        - name: endTime
          in: query
          description: 结束时间戳
          required: false
          example: 1758706628
          schema:
            type: integer
        - name: native
          in: query
          description: 原生类别:0=非原生,1=原生,2=运营商原生。<b>此处固定为：2</b>
          required: false
          example: 2
          schema:
            type: integer
        - name: token
          in: header
          description: 用户api key。<a href="/9518263m0" target="_blank">api key获取方式</a>
          required: true
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
                      bandwidthList:
                        type: array
                        items:
                          type: object
                          properties:
                            downstreamTraffic:
                              type: integer
                              title: 下行流量
                            time:
                              type: string
                              title: 时间
                            upstreamTraffic:
                              type: integer
                              title: 上行流量
                          required:
                            - downstreamTraffic
                            - time
                            - upstreamTraffic
                          x-apifox-orders:
                            - downstreamTraffic
                            - time
                            - upstreamTraffic
                        title: 带宽列表
                      currentBandwidth:
                        type: integer
                        title: 当前实时带宽
                      peakBandwidth:
                        type: integer
                        title: 峰值带宽
                    required:
                      - bandwidthList
                      - currentBandwidth
                      - peakBandwidth
                    x-apifox-orders:
                      - bandwidthList
                      - currentBandwidth
                      - peakBandwidth
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
                    time: '1755321650'
                    data:
                      bandwidthList:
                        - downstreamTraffic: 0
                          time: 2025-08-16 00
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 01
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 02
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 03
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 04
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 05
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 06
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 07
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 08
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 09
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 10
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 11
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 12
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 13
                          upstreamTraffic: 0
                      currentBandwidth: 0
                      peakBandwidth: 0
                      reqParams:
                        endTime: '2025-08-16 13:18:31'
                        intervalType: fixed
                        intervalUnit: h
                        intervalValue: 1
                        startTime: '2025-08-16 00:00:00'
                        timeZone: Asia/Shanghai
                '2':
                  summary: 成功示例
                  value:
                    code: 1
                    msg: 获取成功!
                    time: '1755321775'
                    data:
                      bandwidthList:
                        - downstreamTraffic: 0
                          time: 2025-08-16 00
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 01
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 02
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 03
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 04
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 05
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 06
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 07
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 08
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 09
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 10
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 11
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 12
                          upstreamTraffic: 0
                        - downstreamTraffic: 0
                          time: 2025-08-16 13
                          upstreamTraffic: 0
                      currentBandwidth: 0
                      peakBandwidth: 0
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-494467043-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
