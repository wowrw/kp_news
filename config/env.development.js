
// 本地环境配置
module.exports = {
    modeName: '开发模式',
    title: '我的商城...',
    baseApi: '/api', // 代理前缀
    target: process.env.VUE_APP_APIDOMAINNAME,//'http://localhost:5050',    
    publicPath: '/'
}