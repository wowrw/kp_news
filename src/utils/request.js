/**
 * axios 封装 
 */
import axios from "axios";
import { Toast, Dialog } from "vant";
import { getToken } from "@/utils/auth";
import router from "@/router";
import configEnv from "@/../config/index.js";

let loading = null;
let requestCount = 0;

// 显示loading
function showLoading () {
  if (requestCount === 0) {
    loading = Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
  }
  requestCount++;
}

// 隐藏loading
function hideLoading () {
  if (requestCount > 0) {
    requestCount--
  }
  if (loading && requestCount === 0) {
    loading.clear();
  }
}

/**
 * 请求失败后的错误统一处理
 * @param {number} code 请求失败的状态码
 */
const handleError = (code) => {
  switch (code) {
    case 401:
      // do something ...清除一些全局的loading
      Toast.clear();
      router.push({ name: "login" });
      break;

    default:
      break;
  }
};

console.log(configEnv);

// create an axios instance
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  //baseURL: configEnv.baseApi, // .env中配置的api前缀
  baseURL: configEnv.target, // .env中配置的api前缀
  timeout: 5000, // request timeout
});

// 添加请求拦截器
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
service.interceptors.request.use((config) => {
  // 添加header头的token  
  const token = getToken();
  if(token)
    config.headers.Token = token;  // config.headers.Authorization = token;

  // 在发送请求之前做些什么  
  showLoading(); // 显示loading 
  return config;
},(error) => {  

    hideLoading(); // 隐藏loading
    // 对请求错误做些什么    
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
/**
 * 响应格式
 * { code => 状态码, msg => '响应信息', data => 数据 }
 */
service.interceptors.response.use((response) => { 

  const result = response.data; //result = { code msg data }   
  
  hideLoading(); // 隐藏loading

  if (parseInt(result.code) === 0 ) { // success      result.msg
    return Promise.resolve(result);    
  } else { // 处理自定义错误    
    handleError(parseInt(result.code));
    return Promise.reject(new Error(result.msg || "响应未知错误"));
  }
},(error) => {

    // 对响应错误做点什么
    console.error("response error:" + error); // for debug
    
    hideLoading(); // 隐藏loading

    // 全局错误提示
    if (error.response && error.response.data && error.response.data.errorCode) {
      Dialog.alert({ title: "响应拦截器错误", message: error.response.data.msg });
    }
    
    return Promise.reject(error);
  }
);

export default service;
