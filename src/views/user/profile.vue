<template>
  <div id="user-profile">
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="$router.back()"></van-nav-bar>

    <van-form @submit="onSubmit">
      <van-field label="用户Id" v-model="userForm.id" type="text" disabled />

      <van-field
        label="用户名"
        v-model="userForm.nickname"
        type="text"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '无效用户名' }]"
      />

      <van-field
        label="邮箱"
        v-model="userForm.email"
        type="email"
        placeholder="请输入邮箱"
        :rules="[{ pattern:regEmail, message: '无效邮箱' }]"
      />

      <van-field
        label="电话"
        v-model="userForm.phone"
        type="tel"
        placeholder="请输入电话"
        :rules="[{ pattern:regPhone, message: '无效手机号码' }]"
      />

      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="userForm.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="userForm.birthday"
        readonly
        clickable
        name="datetimePicker"
        label="时间选择"
        placeholder="点击选择时间"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          @confirm="onConfirm"
          @cancel="showPicker = false"
          @change="onchange"
          v-model="userForm.birthday"
          :value="userForm.birthday"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>
      <!-- 地区选择 -->
      <van-field
        v-model="userForm.address"
        readonly
        clickable
        name="area"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area  :area-list="areaList" @confirm="onaddress" @cancel="showArea = false" />
      </van-popup>
      <van-field name="uploader" label="头像">
        <template #input>
          <van-uploader name="avatar" v-model="headImg" :max-count="1" :after-read="afterRead" />
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getDetailById, updateById, uploadAvatar } from "@/api/user.js";
import { areaList } from "@vant/area-data";
import { getUserInfo } from "@/utils/auth.js";

export default {
  data() {
    return {
      // 日期
      showPicker: false,
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2022, 0, 1),
      // 地址
      showArea: false,
      areaList, // 数据格式见 Area 组件文档

      userForm: {
        //表单中的字段名与数据库中用户表的字段名要求一致
        id: null,
        username: "",
        nickname: "",
        email: "",
        phone: "",
        sex: "男",
        birthday: "",
        address: ""
      },
      headImg: [],
      //规则:字母数字‘6~12
      regNamePwd: /^[a-z0-9]{6,12}$/i,
      regPhone: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
      regEmail: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    };
  },
  async created() {
    try {
      let id = getUserInfo().id;
      let result = await getDetailById({ id });
      if (result.code === "0") {
        this.userForm = result.data;
        this.headImg = [];
        this.headImg.push({
          url: this.userForm.headImg
        });
        return;
      }
      throw result;
    } catch (error) {
      this.$dialog.alert({
        title: "获取用户数据失败",
        message: error
      });
    }
  },
  methods: {
    // 地区选择
    onaddress(values) {
      this.userForm.address = values
        .filter(item => !!item)
        .map(item => item.name)
        .join("/");
      this.showArea = false;
    },
    //时间选择
    //点击完成按钮时触发的事件
    onConfirm(date) {
      this.userForm.birthday = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      this.showPicker = false;
    },
    //当值变化时触发的事件
    onchange(date) {
      this.userForm.birthday = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
    },

    async afterRead(file, detail) {
      file.status = "uploading";
      file.message = "上传中...";
      let result = await uploadAvatar(file, detail);
      console.log(result);
      file.status = "";
      file.message = "";
      //重新生成显示的图片url
      this.headImg = [];
      this.headImg.push({
        url: this.APIDomainName + result.url
      });
      //设置用户表中的字段值
      this.userForm.headImg = result.url;
    },

    async onSubmit() {
      if (this.userForm.name === "0") {
        this.$toast("用户不能为空");
        return;
      } else if (this.userForm.email === "") {
        this.$toast("邮箱不能为空");
        return;
      }

      try {
        let user = this.userForm;
        let result = await updateById(user); //注意传递过去的参数user的属性名
        console.log(user);
        if (result.code === "0") {
          this.$toast("更新成功！");
          this.$router.push({ name: "user" });
          return;
        }

        throw result;
      } catch (error) {
        this.$dialog.alert({
          title: "更新失败",
          message: error
        });
      }
    }
  }
};
</script>

<style>
</style>
