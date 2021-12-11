<template>
  <div>
    <!-- 搜索框 -->
    <div class="head">
      <van-nav-bar class="app-nav-bar" fixed>
        <template #left>
          <!-- log图标 -->
          <van-image width="100" height="2.8rem" src="http://114.55.59.237:8080/image/logo.jpg" />
        </template>

        <van-button
          class="search-btn"
          slot="title"
          icon="search"
          size="small"
          type="info"
          round
          to="/search"
        >学习指南</van-button>

        <template #right>
          <!-- 积分图标 -->
          <van-icon name="medal-o" size="30px" @click="integral" />
          <p class="integral_icon" @click="integral">积分</p>
        </template>
      </van-nav-bar>
    </div>
    
    <!-- 空白 -->
    <div style="width: 100%; height: 55px;"></div>
    <!-- 轮播组件调用 -->
    <swiper :carouselItems="carouselItems"></swiper>

    <div id="image_news" v-for="(item, i) of videoItems" :key="i">
      <router-link :to="{name:'videos_detail',params:{id:item.id}}">
        <!-- 图片 -->
        <div class="news-img">
          <img :src="`${item.img}`" alt />
        </div>
        <!-- 内容 -->
        <div class="news">
          <div class="news_title">{{item.title}}</div>
          <div class="news_user_name">用户名</div>
          <div class="news_time">{{item.time}}</div>
        </div>
        <van-divider :style="{ borderColor: 'red',padding: '0 16px'}"></van-divider>
      </router-link>
    </div>
    <footer-nav :seleted="2"></footer-nav>
  </div>
</template>



<script>
import Swiper from "@/components/Swiper.vue";
//import Mock from  "mockjs"; //引入
import FooterNav from "@/components/FooterNav.vue";

import { getCarouselList, getvideoList } from "@/api/home.js";

export default {
  components: {
    Swiper,

    "footer-nav": FooterNav
  },

  data() {
    return {
      carouselItems: [],
      videoItems: []
    };
  },

  created() {
    this.getCarouselItems(); //=====================================
    this.getvideoItems(); //=====================================
  },

  methods: {
    // 获取轮播
    async getCarouselItems() {
      try {
        let result = await getCarouselList();

        if (result.code === "0") {
          this.carouselItems = result.data;
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.$dialog.alert({ title: "错误", message: error });
      }
    }, //=======================================
    
    // 获取视频列表
    async getvideoItems() {
      try {
        let result = await getvideoList();

        if (result.code === "0") {
          this.videoItems = result.data;
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.$dialog.alert({ title: "错误", message: error });
      }
    }, //=======================================
    integral() {
      this.$router.push("/integral");
    }
  }
};
</script>



<style lang="less" scoped>
// 顶部
.head {
  .app-nav-bar {
    background-color: red;
    height: 2.8rem;
  }
  .van-icon {
    color: #fff;
  }
  .integral_icon {
    color: white;
  }
  // 搜索按钮
  .search-btn {
    margin-left: 35px;
    width: 190px;
    height: 32px;
    background: #e48686;
    border: none;
    .van-icon {
      font-size: 16px;
      color: white;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
// 文章
.image_news {
  margin: 0;
  padding: 0;
}
.news-img img {
  float: left;
  width: 100px;
  height: 90px;
  margin: 5px 10px 0px 10px;
  padding-top: 10px;
}
.news {
  width: 100%;
  height: 100px;
  padding-top: 10px;
}
.news_title {
  height: 40px;
  padding-top: 5px;
  margin: 0px 8px 10px 0px;
  font-size: 18px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.news_user_name {
  height: 25px;
  color: rgb(147, 146, 146);
  font-size: 16px;
}
// 日期
.news_time {
  height: 20px;
  color: rgb(147, 146, 146);
  font-size: 14px;
}

.van-grid {
  font-size: 14px;
  background-color: #fff;
  border: none;
}
// router-link样式
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
  color: black;
}
</style>