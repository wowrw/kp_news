<template>
  <div class="info-container">
    <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>

    <!-- name,spec,sell_point,price,count,img,content -->

    <van-image fit="contain" width="100%" height="200" :src="`${APIDomainName}${goods.img}`" />

    <van-cell title="商品名" :label="goods.title" />

    <van-cell title="商品规格" :label="goods.content" />

    <van-cell title="单价" :value="goods.img" />

    <van-cell title="库存数量" :value="goods.lick_count" />

    <van-cell title="销售亮点" :label="goods.click_count" />

    <van-divider>详情</van-divider>

    <!-- 内容区域 -->

    <div class="content" v-html="goods.content"></div>
  </div>
</template>



<script>
import { getGoodsDetailById } from "@/api/goods.js";

export default {
  data() {
    return {
      goods: {}

      //id: this.$route.params.id,
    };
  },

  props: {
    id: Number
  },

  created() {
    // 调用方法

    this.getGoodsInfo();
  },

  methods: {
    // 定义方法

    async getGoodsInfo() {
      // 获取新闻详情数据

      try {
        let params = { id: this.id };

        let result = await getGoodsDetailById(params);

        if (result.code === 1) {
          this.goods = result.data[0]; //数组的第一个元素
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.dialog.alert({ title: "错误", message: error });
      }
    } //=======================================
  }
};
</script>

<style lang="scss">
</style>