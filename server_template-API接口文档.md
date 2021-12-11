# 1. API 接口文档

## 1.1. API V1 接口说明

- 接口基准地址：`http://localhost:5050`
- 服务端已开启 CORS 跨域支持对所有localhost的端口跨越- 
- 数据返回格式统一使用 JSON

### 1.1.1. 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 1.1.2. 返回状态码code说明

|状态码| 含义 | 说明  |
|:---- |:----------- | ----------------- |
| 1 | OK| 请求成功  |
| 2| NOLOGIN| 没有登录|
| -1| FAILED| 请求失败 ，具体参见返回的msg信息|

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：/user/islogin
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| 无参数 |          |      |

- 响应参数

| 参数名 | 参数说明     | 备注               |
| ------ | ------------ | ------------------ |
| code   | 状态码     | 1登录成功  2未登录 |
| msg    | 提示信息     |                    |
| data   | 登录人员信息 |                    |

- 响应数据

```json
{
  "code":1,
  "msg":"已登录",
  "data":{
    "user":{
      "name":"dingding",
      "id":3
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJOYW1lIjoiZGluZ2RpbmciLCJpYXQiOjE2MzMyNTE5OTQsImV4cCI6MTYzMzI1NTU5NH0.YxASuOOaNd4cGPyZwgmZllva5-T0UAfi_ZvxOscl40E",, //注意，已登录会有一个token
  }
}
```

### 1.2.2. 登录接口

- 请求路径：/user/login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| name | 用户名   |      |
| password | 密码     |      |

- 响应参数

| 参数名 | 参数说明     | 备注                 |
| ------ | ------------ | -------------------- |
| code   | 状态码       | 1登录成功  0登录失败 -1Query异常|
| msg    | 提示信息     |                      |
| data   | 登录人员信息 |                      |

- 响应数据

```json
{
    "code": 1,
    "msg": "登录成功",
    "data": {
        "user": {
            "name": "dingding",
            "id": 3
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJOYW1lIjoiZGluZ2RpbmciLCJpYXQiOjE2MzMyNTE5OTQsImV4cCI6MTYzMzI1NTU5NH0.YxASuOOaNd4cGPyZwgmZllva5-T0UAfi_ZvxOscl40E", //注意，登录时将会额外得到一个token
    }
}

```



### 1.2.3. 注册接口

- 请求路径：/user/register
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| name | 用户名   | 必须  |
| password | 密码     |必须|
| email    | 邮箱     |必须|
| phone    | 邮箱     |必须|

- 响应参数

| 参数名 | 参数说明     | 备注                 |
| ------ | ------------ | -------------------- |
| code   | 状态码       | 1注册成功  -1注册失败 |
| msg    | 提示信息     |                      |
| data   | 登录人员信息 |                      |

- 响应数据

```json
{
  "code": 1,
  "msg": "注册成功",
  "data": {    
    "user": {
      "name": "dingding",
      "id": 3
    },
  }
}
```



##  新闻资讯

### 1.查询新闻资讯列表

- 请求路径：news/list
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| 无参数 |          |      |

- 响应参数

| 参数名  | 参数说明     | 备注                 |
| ------- | ------------ | -------------------- |
| code  | 状态码       | -1查询失败  1查询成功 |
| msg  | 返回消息       |  |
| data | 新闻资讯列表 |                      |

- 响应数据

```json
{
  "code": 1,
  "msg":"查询成功",
  "data": [
    {
      "id": 13,
      "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
      "add_time": "2015-04-16 03:50:28",
      "summary": "房企一季度销售业绩已经陆续公布，克而瑞研究中心统计",
      "count": 1,
      "img": "/uploads/news/201504161149414479.jpg"
    },
    {
      "id": 14,
      "title": "买房还是炒股，2015年买房无法拒绝的5大理由",
      "add_time": "2015-04-16 04:05:34",
      "summary": "转眼间2015年已经过去了4个月，在这短短的四个月",
      "count": 2,
      "img": "/uploads/news/201504161205596364.jpg"
    }
  ]
}
```

### 2.根据id查询新闻详情

- 请求路径：news/detail
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| id     | 新闻id   |      |

- 响应参数

| 参数名  | 参数说明     | 备注                 |
| ------- | ------------ | -------------------- |
| code  | 状态码       | -1查询失败  1查询成功 |
| msg  | 返回消息       |  |
| data | 新闻资讯详情 |                      |

- 响应数据

```json
{
  "code": 1,
  "msg":"查询成功",
  "data":
    {
      "id": 13,
      "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
      "count": 1,
      "add_time": "2015-04-16 03:50:28",
      "content": "<p>房企一季度销售业绩已经陆续公布，克而瑞研究中心统计数据显示，今年一季度，TOP20的房企仅6家实现业绩同比增长。</p><b>多家企业销售下滑<\/b>..."
    }  
}
```