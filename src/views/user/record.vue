<template>
  <div class="home">
    <div class="head">
      <van-nav-bar title="历史记录" left-arrow @click-left="$router.back()" />
      <van-divider :style="{borderColor: 'red'}">新闻</van-divider>
    </div>
    <!-- 内容开始 -->
    <div class="kobai"></div>
    <van-swipe-cell v-for="(item, i) of HistoryList" :key="i">
      <van-cell :border="false" :title="item.title" :label="item.time" />
      <template #right>
        <van-button square type="danger" text="删除" @click="DelHistoryList(item.id)" />
      </template>
    </van-swipe-cell>
    <!-- 内容结束 -->
  </div>
</template>

<script>
import { getHistoryListArticle, DelHistory } from "@/api/collection.js";
import { mapState } from "vuex"; // mapGetters

export default {
  data() {
    return {
      HistoryList: ""
    };
  },
  created() {
    this.getHistoryItems();
  },
  computed: {
    ...mapState("user", ["user", "isLogin"])
  },
  methods: {
    async getHistoryItems() {
      try {
        let userid = { userid: this.user.id };
        let result = await getHistoryListArticle(userid);
        console.log(result.data);
        if (result.code === "0") {
          this.HistoryList = result.data;
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.$dialog.alert({ title: "错误", message: error });
      }
    }, //=======================================

    async DelHistoryList(id) {
      try {

        let params = { id };
        let result = await DelHistory(params);
        console.log(result);
        if (result.code === "0") {
          this.$toast("删除成功！");
          history.go(-1);
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