<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{ newsInfo.title }}</h1>
    <!-- 子标题 -->
    <p class="newsinfo-nav">
      <span>发表时间：{{ newsInfo.add_time }}</span>
      <span>点击：{{ newsInfo.count }}次</span>
    </p>
    <hr/>
    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>
  </div>
</template>

<script>
import {Dialog} from "vant";
import { getNewDetailById } from "@/api/news.js";
export default {
  data() {
    return {
      newsInfo: {},
      id: this.$route.params.id,
    };
  },
  created() {
    // 调用方法
    this.getNewsInfo();
  },
  methods: {
    // 定义方法
    async getNewsInfo() {
      // 获取新闻详情数据      
      try {
        let result = await getNewDetailById({ id: this.id });
        if (result.code === 1) {
          this.newsInfo = result.data;          
        } else {
          throw result.msg;
        }
      } catch (error) {
        Dialog.alert({title:"错误", message:error});
      }
    }, //=======================================
  },
};
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 5px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
    color: orangered;
  }
  .newsinfo-nav {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #26a2ff;
  }
  .content {
    white-space: pre-wrap;
    font-size: 14px;
    img {
      width: 100%;
    }
  }
}
</style>
