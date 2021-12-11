<template>
  <van-nav-bar fixed :title="$route.meta.title" >
    <template #left>
      <div v-show="$route.path !== '/home'" @click="$router.back()" 
        ><van-icon name="arrow-left" size="14" style="vertical-align: middle"/>返回
      </div>
    </template>
  </van-nav-bar>
</template>

<script>

export default {
  
};
</script>

<style lang="less" scoped>
//@nav-bar-background-color:@blue;


</style>