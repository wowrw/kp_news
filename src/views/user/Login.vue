<template>
  <div>
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div class="head">
      <div class="ulogin">
        <span class="title">账号登录</span>
        <van-cell-group inset class="slogin">
          <van-field label="账号" placeholder="请输入账号" v-model="loginForm.username" />
          <van-field label="密码" placeholder="请输入密码" type="password" v-model="loginForm.pwd"></van-field>
          <van-button
            @click="onClickLogin"
            round
            hairline
            type="info"
            size="normal"
            block
            color="red"
          >登录</van-button>
        </van-cell-group>
        <div class="link-area">
          <van-button round plain hairline type="info" @click="onRegister">还没有账号？前往注册</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapState } from "vuex"; // mapGetters

export default {
  data() {
    return {
      loginForm: {
        username: "wer",
        pwd: "123"
      },
      userToken: "",
    };
  },
  mounted() {
    // this.loginForm.username = this.user.name; //初始赋值
  },
  computed: {
    ...mapState("user", ["user"])
  },
  methods: {
    ...mapActions("user", ["login"]), // `mapActions` 支持载荷将 `this.login(user)` 映射为 `this.$store.dispatch('login', user)`

    async onClickLogin() {
      if (this.loginForm.username === "" || this.loginForm.pwd === "") {
        this.$toast("账号或密码不能为空");
        return;
      }

      // try {
      let user = this.loginForm;
      let result = await this.login(user); // `mapActions` 支持载荷将

      if (result.code === "0") {
        this.$toast("登录成功！");
        this.$router.replace({ name: "user" });
      } else {
        throw result.msg;
      }
      // } catch (error) {

      //   this.$dialog.alert({ title: "登录失败", message: error });
      // }
    },
    onRegister() {
      this.$router.push({ name: "register" });
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, #ff416c, #ff4b2b);
}
.ulogin {
  width: 350px;
  height: 300px;
  padding-top: 30px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 25px;
  box-shadow:5px 5px 10px #000;
}
.link-area {
  display: block;
  margin-top: 40px;
  text-align: center;
}
.title {
  font-size: 25px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
