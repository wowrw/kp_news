
// 发布环境配置
module.exports = {
    modeName: '生产模式',
    title: '我的商城',
    baseApi: '/api', // 代理前缀,//'http://localhost:5050', // 线上接口地址  
    target:  process.env.VUE_APP_APIDOMAINNAME,//'http://localhost:5050', 
    publicPath: '/'
}