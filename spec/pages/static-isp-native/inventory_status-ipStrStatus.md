# 查询静态住宅（运营商原生）IP段列表

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /externalapi/inventory_status/ipStrStatus:
    get:
      summary: 查询静态住宅（运营商原生）IP段列表
      deprecated: false
      description: ''
      tags:
        - 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      parameters:
        - name: access_token
          in: query
          description: 用户token。用户登录之后，获取token
          required: true
          example: '{{access_token}}'
          schema:
            type: string
        - name: type
          in: query
          description: 类型:1=全球静态住宅,2=全球数据中心。<b>此处固定为：1</b>
          required: true
          example: '1'
          schema:
            type: string
        - name: status
          in: query
          description: 计费方式:1=按时间计费。<b>此处固定为：1</b>
          required: true
          example: '1'
          schema:
            type: string
        - name: native
          in: query
          description: 原生:0=非原生,1=本土原生,2=运营商原生。<b>此处固定为：2</b>
          required: true
          example: '2'
          schema:
            type: string
        - name: country_code
          in: query
          description: >-
            静态住宅国家编码code。<a target="_blank"
            href="/api-494467034">静态住宅（运营商原生）对应国家列表</a>
          required: false
          example: US
          schema:
            type: string
        - name: city_code
          in: query
          description: >-
            静态住宅城市名称。在<a target="_blank"
            href="/api-494467035">静态住宅（运营商原生）对应城市列表</a>可获取城市名称。
          required: false
          example: Los Angeles
          schema:
            type: string
        - name: ip_str
          in: query
          description: 指定段前缀
          required: false
          example: 130.12.132
          schema:
            type: string
        - name: exclude_ip_str
          in: query
          description: 需要排除掉的ip段，多个以英文逗号分隔
          required: false
          example: 130.12.132
          schema:
            type: string
        - name: page
          in: query
          description: 页码,默认1
          required: false
          example: '1'
          schema:
            type: string
        - name: pageSize
          in: query
          description: 每页条数,默认50,最大100
          required: false
          example: '50'
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
              example:
                code: 1
                msg: 库存获取成功!
                time: '1786506206'
                data:
                  current_page: 1
                  last_page: 1
                  total: 1
                  data:
                    - ipStr: 130.12.132
                      remark: 紧张
                      skuStatus: 1
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: 用户IP子账号管理/静态住宅（运营商原生）时长子账号
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/3406922/apis/api-515965028-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.zhizhuip.cc
    description: 正式环境
security: []

```
