<template>
  <van-swipe :autoplay="4000">
    <van-swipe-item v-for="item in carouselItems" :key="item.id">
      <router-link :to="{name:'goods_detail',params:{id:item.id}}">
        <van-image
          :src="item.img"
          width="100%"
          height="100%"
          fit="contain"
          @click="onClick(item.id)"
        />
      </router-link>
    </van-swipe-item>
  </van-swipe>
</template>



<script>
export default {
  props: ["carouselItems"],

  methods: {
    onClick() {
      //this.$router.push({path:`goods/detail/${id}`}) ;  //编程式导航
      //this.$router.push({name:"goods_detail",params:{id:id}}) ;  //编程式导航
    }
  }
};
</script>



<style lang="scss" scoped>
.van-swipe {
  padding-top: 10px;
  height: 200px;

  color: #fff;

  .van-swipe-items-wrap {
    .van-swipe-item {
      text-align: center;
    }

    img {
      width: 100%;
      height: 200px;
    }
  }
}
</style>