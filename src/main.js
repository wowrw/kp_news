
import App from './App.vue'
import store from './store'
import router from './router'
import Vant from 'vant';
import Vue from 'vue';

import 'vant/lib/index.css';
Vue.use(Vant);

//vue  视频
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)


Vue.config.productionTip = false

// 初始化样式
import "@/assets/css/reset.css";

// 设置html根字体大小
import "@/assets/css/font_html.css";

// 一次性导入所有Vant组件，引入所有组件会增加代码包体积，建议自动按需引入组件

// 导入vant css(由于采用配置主题方式，这里需要导入vant less 主题文件,如果不需要自定义主题注释下面代码，然后解除config/cdn.js 中vant主题样式的注释)
import "vant/lib/index.less";

import "@/icons";

// mock模式
// if (process.env.VUE_APP_MODE == "mock") {
//   require("../mock");
//   console.log("本地mock数据已导入");
// }

Vue.prototype.APIDomainName = process.env.VUE_APP_APIDOMAINNAME



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')