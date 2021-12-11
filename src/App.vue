<template>
  <div class="container">
    <!-- <header-nav></header-nav> -->
    <div>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import {Toast} from "vant";
import { mapActions } from "vuex";
// import FooterNav from '@/components/FooterNav.vue';
//import HeaderNav from "@/components/HeaderNav.vue";

export default {
  data() {
    return {};
  },
  created() {
    //this.checkLogin();
  },
  watch: {},
  methods: {
    ...mapActions("user", ["islogin"]), // `mapActions` 支持载荷将 `this.islogin` 映射为 `this.$store.dispatch('islogin')`

    async checkLogin() {
      try {
        let result = await this.islogin();
        if (result.code == 0) {
          Toast("用户已经登录");
        }
      } catch (error) {        
        //需要用户登录
        this.$router.push({ name: "login" });
      }
    },
  },
  components: {
    // "footer-nav":FooterNav,
    //"header-nav":HeaderNav    
  },
};
</script>

<style lang="scss">

.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.container {
  // padding-top: 46px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

</style>