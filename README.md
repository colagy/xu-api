# xu-api

## 创建工具 api.js

```

// 引入npm
const Api = require('xu-api')
// 定义接口地址
const host = 'http://127.0.0.1:8000/api/v1'
// 定义是否缓存接口返回的数据
const cache = false;

const api = new Api(host,cache)
module.exports = api

```

## 使用工具

```

// 引入api工具 封装了get,post,put,del 默认10000毫秒超时
const api = require('./api');
// GET请求
const get = await api.get('/item',{
    id : 1
});
// POST请求
const post = await api.post('/item',{
    name : 'test'
})
// PUT请求
const put = await api.put('/item',{
    id : 1,
    name : 'test update'
})
// DELETE请求
const del = await api.del('/item',{
    id : 1
})

```
