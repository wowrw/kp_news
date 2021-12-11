<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="more-o" size="0.6rem" />
      </template>
    </van-nav-bar>

    <!-- 搜索框 -->
    <van-search  shape="round" placeholder="请输入搜索关键词" />
    <div class="m_content">
      <!-- 单元格 -->
      <van-cell title="单元格" icon="scan" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">扫一扫添加好友</span>
        </template>
      </van-cell>
      <van-cell title="单元格" icon="bullhorn-o" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">发起群聊</span>
        </template>
      </van-cell>
      <van-cell title="单元格" icon="user-circle-o" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">新的好友</span>
        </template>
      </van-cell>
      <van-cell title="单元格" icon="contact" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">我的好友</span>
        </template>
      </van-cell>
      <van-cell title="单元格" icon="friends-o" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">我的群组</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "message_add",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    m_search() {
      this.$router.replace("/message_search");
    }
  }
};
</script>

<style scoped lang="less">
.m_content {
  margin-top: 5px;
}
</style>