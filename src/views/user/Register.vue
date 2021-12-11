<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>
    <div class="head">
      <div  class="ulogin">
        <span class="title">账号登录</span>
        <van-cell-group inset class="slogin">
          <van-field label="用户" v-model="regForm.username" type="text" placeholder="请输入用户" />

          <van-field label="密码" v-model="regForm.pwd" type="pwd" placeholder="请输入密码" />

          <van-field label="确认" v-model="regForm.pwd2" type="pwd" placeholder="请确认密码" />

          <van-field label="手机号" v-model="regForm.phone" type="phone" placeholder="请输入手机号码" />

          <van-button @click="onClickRegister" round type="info" size="normal" block color="red">注册</van-button>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user.js";

export default {
  data() {
    return {
      regForm: {
        username: "",
        pwd: "",
        pwd2: "",
        phone: ""
      }
    };
  },
  methods: {
    async onClickRegister() {
      if (this.regForm.username === "") {
        this.$toast("用户不能为空");
        return;
      } else if (this.regForm.pwd === "") {
        this.$toast("密码不能为空");
        return;
      } else if (this.regForm.pwd != this.regForm.pwd2) {
        this.$toast("密码两次输入不一致");
        return;
      } else if (this.regForm.phone === "") {
        this.$toast("邮箱不能为空");
        return;
      }
      try {
        let user = this.regForm;
        delete user.pwd2; //删除该临时的字段
        let result = await register(user);
        console.log(result);
        if (result.code === "0") {
          this.$store.commit("user/setUser", result.data.user); //保存用户信息，还是处于未登录
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        this.$dialog.alert({ title: "注册失败", message: error });
      }
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
.title {
  font-size: 25px;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

