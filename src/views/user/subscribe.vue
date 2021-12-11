<template>
  <div class="home">
    <div class="head">
      <van-nav-bar title="订阅列表" left-arrow @click-left="$router.back()" />
      <van-divider :style="{borderColor: 'red'}">用户</van-divider>
    </div>
    <!-- 内容开始 -->
    <div class="kobai"></div>
    <van-swipe-cell v-for="(item, i) of Subscribeitem" :key="i">
      <van-image
        style="padding:0;
        margin-left:15px;"
        round
        width="2rem"
        height="2rem"
        :src="`${item.headImg}`"
      />
      <van-cell :border="false" :title="item.nickname" />
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="DelSubscribeItems(item.userid,item.fuserid)"
        />
      </template>
    </van-swipe-cell>
    <!-- 内容结束 -->
  </div>
</template>

<script>
import {
  DelSubscribeByFuserid,
  getSubscribeNewList
} from "@/api/collection.js";

import { mapState } from "vuex"; // mapGetters

export default {
  data() {
    return {
      Subscribeitem: ""
    };
  },
  created() {
    this.getSubscribeitem();
  },
  computed: {
    ...mapState("user", ["user", "isLogin"])
  },
  methods: {
    async getSubscribeitem() {
      // 获取订阅列表
      try {
        let userid = { userid: this.user.id };
        let result = await getSubscribeNewList(userid);
        console.log(result);
        if (result.code === "0") {
          this.Subscribeitem = result.data;
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.$dialog.alert({ title: "错误", message: error });
      }
    }, //=======================================

    async DelSubscribeItems(userid, fuserid) {
      // 删除订阅
      try {
        let params = { userid, fuserid };
        let result = await DelSubscribeByFuserid(params);
        console.log(result);
        if (result.code === "0") {
          this.$toast("删除成功！");
          history.go(-1);
          // this.loadData(); //重新加载购物车数据
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.$dialog.alert({ title: "错误", message: error });
      }
    } //=======================================
  }
};
</script>



<style>
.home {
  width: 100%;
  height: 100%;
  background-color: white;
}

.head {
  z-index: 10;
  width: 100%;
  height: 100px;
  background-color: white;
  position: fixed;
}

.van-divider {
  font-size: 22px;
  color: red;
  margin-top: 5px;
}

.kobai {
  width: 100%;
  height: 50px;
  margin-bottom: 50px;
}

.title-news {
  width: 100%;
  height: 100px;
}

.titles {
  font-size: 20px;
  margin: 0px 10px 0px 10px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.times {
  float: left;
  padding-right: 185px;
  color: rgba(120, 120, 120, 0.6);
  font-size: 15px;
  margin: 10px 10px 0px 10px;
}
</style>