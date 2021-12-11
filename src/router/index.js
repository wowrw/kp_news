import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/views/home/home.vue";

//import User from "@/views/User.vue";
const User = () => import(/* webpackChunkName: "user" */"@/views/User.vue");
import Login from "@/views/user/Login.vue";
// import Register from "@/views/user/Register.vue";

import NewsList from "@/views/news/NewsList.vue";
// import NewsInfo from "@/views/news/NewsInfo.vue";

import message from "@/views/message/message.vue";

import message_add from "@/views/message/add.vue";
import message_detail from "@/views/message/detail.vue";


import Video from "@/views/video/videos.vue";

import { getToken } from "@/utils/auth.js";

import Test from "@/views/test/Test.vue"
const routes = [

  { path: "/test", component: Test },

  { path: "/", redirect: "/home", meta: { title: "首页" } },
  { path: "/home", component: Home, name: "home", meta: { title: "首页", keepAlive: true, footShow: true } },

  { path: "/user", component: User, name: "user", meta: { title: "我的", footShow: true } },
  {
    path: "/user/login",
    component: Login,
    name: "login",
    meta: {
      title: "登录",

    },
  },
  {
    path: "/user/register",
    component: () => import("@/views/user/Register.vue"),
    name: "register",
    meta: { title: "注册" },
  },

  {
    path: "/collection",
    component: () => import("@/views/user/collection.vue"),
    name: "collection",
    meta: {
      title: "收藏",
      footShow: false// true显示，false隐藏 }, 
    },
  },
  {
    path: "/subscribe",
    component: () => import("@/views/user/subscribe.vue"),
    name: "subscribe",
    meta: { title: "订阅" },
  },
  {
    path: "/record",
    component: () => import("@/views/user/record.vue"),
    name: "record",
    meta: { title: "历史记录" },
  },


  {
    path: "/user/profile",
    component: () => import("@/views/user/profile.vue"),
    name: "profile",
    meta: { title: "个人资料" },
  },

  {
    path: "/integral",
    component: () => import("@/views/integral/index.vue"),
    name: "integral",
    meta: { title: "积分", },
  },

  {
    path: "/news/list",
    component: NewsList,
    name: "news_list",
    meta: { title: "新闻资讯列表" },
  },
  {

    path: "/goods/detail/:id",

    component: () => import("@/views/home/goodsdetail.vue"),

    props: true,

    name: "goods_detail",

    meta: { title: "商品详情" },

  },






  //更过路由的实现，可以参考项目源码 https://gitee.com/watchping/vue-myshop

  {
    path: "/message",
    component: message,
    name: "message",
    meta: {
      footShow: true
    }
  },
  {
    path: "/message_add",
    component: message_add,
    name: "message_add",
  },
  {
    path: "/message_detail",
    component: message_detail,
    name: "message_detail",
  },
  {
    path: "/video",
    component: Video,
    name: "video",
    meta: { footShow: true }


  },
  {

    path: "/videos/detail/:id",

    component: () => import("@/views/video/videosdetail.vue"),

    props: true,

    name: "videos_detail",

    meta: { title: "商品详情" },

  },
];

var router = new VueRouter({
  // 解决路由跳转页面没有置顶
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.meta.requireAuth) {  // 路由需要验证的
    const token = getToken();
    if (token) {  // 验证token是有效的
      next();
    } else {
      if (to.name === 'login') {
        next();
      } else {
        next({ name: 'login' });
      }
    }
  } else {
    next();
  }
});


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
