<template>
  <!-- 已登录 -->
  <div v-if="isLogin">
    <div class="member">
      <div class="user-info">
        <div class="avatar">
          <img :src="`${user.headImg}`" class="image-info" />
        </div>
        <div class="text-info">
          <span>{{user.name }}</span>
        </div>
      </div>
    </div>
    <div>
      <van-cell
        v-for="(item, i) of cellItems"
        :key="i"
        :icon="item.img"
        :title="item.title"
        is-link
        :to="item.path"
      />
      <van-cell @click="onClickLogout" icon="user-o" title="退出登录" is-link />
    </div>
    <footer-nav :seleted="3"></footer-nav>
  </div>
  <!-- 未登录 -->
  <div v-else>
    <div class="member">
      <router-link :to="{ name: 'login' }" class>
        <div class="no-avatar">
          <img :src="avatar_default" class="image-info" />
        </div>
        <div class="no-user-info">
          <div class="no-text-info">登录 / 注册</div>
        </div>
      </router-link>
    </div>
    <footer-nav :seleted="3"></footer-nav>
  </div>
</template>
<script>
import { mapState } from "vuex"; // mapGetters
import { setToken,getToken } from "@/utils/auth.js";
import FooterNav from "@/components/FooterNav.vue";

export default {
  data() {
    return {
      isLogin0: true,
      avatar_default: require("@/assets/images/avatar_default.png"),
      cellItems: [
        {
          title: "个人资料",
          path: "/user/profile",
          img: "user-o"
        },
        {
          title: "学习积分",
          path: "/integral",
          img: "envelop-o"
        },

        {
          title: "收藏",
          path: "/Collection",
          img: "point-gift-o"
        },
        {
          title: "订阅",
          path: "/subscribe",
          img: "point-gift-o"
        },
        {
          title: "历史记录",
          path: "/record",
          img: "point-gift-o"
        }
      ]
    };
  },
  computed: {
    ...mapState("user", ["user", "isLogin"])
  },
  isLogin() {
    //判断是否用户登录，看Token是否为空
    let token = getToken();
    return token ? true : false;
  },

  methods: {
    async onClickLogout() {
      try {
        await this.$store.dispatch("user/logout");
        setToken("");
        this.$toast("退出成功");
      } catch (error) {
        this.$dialog({ title: "退出失败", message: error });
      }
    }
  },
  components: {
    "footer-nav": FooterNav
  }
};
</script>

<style lang="less" scoped>
.member {
  // 登录前
  .no-avatar {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    .image-info {
      width: 110px;
      height: 110px;
    }
  }
  .no-user-info {
    width: 90%;
    height: 70px;
    border-radius: 10px 10px 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    margin-left: 20px;
    .no-text-info {
      position: absolute;
      font-size: 24px;
      color: rgb(255, 255, 255);
    }
  }
}
// 登录后
.user-info {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 120px;
  background: red;
  box-shadow: 0 0.1rem 0.25rem #f8e3c6;
  .avatar {
    position: absolute;
    transform: translateY(-50%);
    top: 57px;
    left: 6px;
    width: 100px;
    height: 80%;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 15);
    border: 1px solid hsla(0, 0%, 100%, 0.4);
    border-radius: 50% 50%;
    .image-info {
      width: 100%;
      height: 100%;
    }
  }

  .text-info {
    position: absolute;
    left: 120px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: rgb(255, 255, 255);
  }
}
</style>
