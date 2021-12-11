<template>
  <div class="home">
    <van-nav-bar left-text="返回" left-arrow @click-left="$router.back(-1)">
      <template #right>
        <van-cell icon="ellipsis" @click="showShare = true" />
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
      </template>
    </van-nav-bar>
    <!-- 标题开始 -->
    <div class="head">
      <div class="title">{{goods.title}}</div>
      <p class="source">来源:中X电视台</p>
      <p class="time">{{goods.time}}</p>
    </div>
    <!-- 标题结束 -->
    <!-- 图文开始 -->
    <div class="bgimg">
      <img :src="`${goods.img}`" style="width:100%" />
      <div class="img-text">{{goods.imgnote}}</div>
      <van-divider :style="{borderColor: '#1989fa', padding: '0 16px' }"></van-divider>
    </div>
    <!-- 图文结束 -->
    <!-- 详情开始 -->
    <div class="details-text">{{goods.content}}</div>
    <!-- 详情结束 -->
    <!-- 阅读量和点赞开始 -->
    <div class="record">
      <div class="read">阅读 {{goods.clickcount}}</div>
      <div class="likeimg">
        点赞 {{goods.likecount}}
        <van-icon name="good-job-o" />
        <!-- <van-icon name="good-job" /> -->
      </div>
    </div>
    <!-- 阅读量和点赞结束 -->
    <van-divider :style="{borderColor: '#1989fa', padding: '0 16px' }"></van-divider>

    <!-- 观点开始 -->

    <div
      style="width:7px; height:28px; background-color:red; float:left; margin:12px 10px 20px 20px; "
    ></div>
    <div style="font-size:24px; margin-top:20px">观点</div>
    <van-button
      @click="AddCollectionitem(goods.id,goods.title)"
      icon="star-o"
      style="margin-left:50px;"
      type="danger"
      size="small"
    ></van-button>
    <div class="link-top"></div>
    <van-skeleton title avatar :row="3" :loading="false" v-for="(item, i) of Comment" :key="i ">
      <div style="margin-left:16px; width:90%;float: left;line-height:40px;">
        <div style="float: left;">
          <van-image round width="2.3rem" height="2.3rem" :src="`${item.headImg}`" />
        </div>
        <div style="font-size: 16px;text-align: center;float: left;">{{item.nickname}}</div>
      </div>
      <van-field
        v-model="item.content"
        rows="2"
        autosize
        label="评论"
        type="textarea"
        show-word-limit
        readonly
      />
      <div class="contenttime">{{item.time}}</div>
    </van-skeleton>
    <div class>
      <van-field
        v-model="articleitem.content"
        center
        clearable
        placeholder="欢迎留言"
        rows="1"
        autosize
        type="textarea"
      >
        <template #button>
          <van-button size="small" round type="danger" @click="onSubmit">提交</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { getGoodsDetailById } from "@/api/goods.js";
import { AddComment, getCommentListArticle } from "@/api/comment.js";
import { AddCollection } from "@/api/collection.js";

import { mapState } from "vuex"; // mapGetters
import { Toast } from "vant";

export default {
  data() {
    return {
      //评论list
      Comment: {},
      //上传数组
      articleitem: {
        userid: "",
        articleid: "",
        content: ""
      },
      loading: true,
      // 新闻list
      goods: {},
      imgurl: "https://img1.baidu.com/it/u=279030105,1477287187&fm=26&fmt=auto",

      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" }
      ]

      //id: this.$route.params.id,
    };
  },

  props: {
    id: Number
  },

  created() {
    // 调用方法
    this.getGoodsInfo();
    this.getCommentInfo();
  },
  computed: {
    ...mapState("user", ["user", "isLogin"])
  },

  methods: {
    // 定义方法
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    async getGoodsInfo() {
      // 获取新闻详情数据
      try {
        let params = { id: this.id };
        let result = await getGoodsDetailById(params);
        // console.log(result);
        if (result.code === "0") {
          this.goods = result.data; //数组的第一个元素
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.dialog.alert({ title: "错误", message: error });
      }
    }, //=======================================
    async getCommentInfo() {
      // 获取评论详情数据
      try {
        let params = { articleid: this.id };
        let result = await getCommentListArticle(params);
        // console.log(result.data);
        if (result.code === "0") {
          this.Comment = result.data;
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.dialog.alert({ title: "错误", message: error });
      }
    }, //=======================================
    async onSubmit() {
      // 添加评论
      if (this.articleitem.content === "") {
        this.$toast("评论不能为空");
        return;
      }
      try {
        this.articleitem.userid = this.user.id;
        this.articleitem.articleid = this.id;
        console.log(this.user.headImg);
        let user = this.articleitem;
        let result = await AddComment(user); //注意传递过去的参数user的属性名
        console.log(user);
        if (result.code === "0") {
          this.$toast("更新成功！");
          location.reload();
          return;
        }
        throw result;
      } catch (error) {
        this.$dialog.alert({
          title: "更新失败",
          message: error
        });
      }
    },
    async AddCollectionitem(id, title) {
      // 添加收藏
      let userid = this.user.id;
      console.log(userid);
      if (userid === undefined) {
        console.log("未登录");
        Toast.fail("还没登录呢");
      } else {
        try {
          this.collectionItem.userid = this.user.id;
          this.collectionItem.articleid = "0";
          this.collectionItem.videoid = id;
          this.collectionItem.title = title;

          let params = this.collectionItem;
          console.log(params);
          let result = await AddCollection(params);
          if (result.code === "0") {
            console.log("收藏成功");
          } else {
            throw result.msg;
          }
        } catch (error) {
          this.dialog.alert({ title: "错误", message: error });
        }
      }
    },
  }
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
}
.head {
  width: 365px;
}
.title {
  margin: 10px 10px 0px 15px;
  font-size: 24px;
}
.source {
  font-size: 18px;
  margin: 10px 0px 10px 15px;
  display: inline;
}
.time {
  font-size: 18px;
  display: inline;
  right: 12px;
  position: absolute;
}
.bgimg {
  margin: 20px 10px 10px 10px;
}
.img-text {
  color: rgb(93, 93, 93);
  font-size: 14px;
  margin: 0px 0px 20px 0px;
}
.details-text {
  width: 350px;
  font-size: 20px;
  margin-left: 15px;
}
.record {
  width: 350px;
  height: 100%;
  margin: 15px 0px 10px 12px;
  display: flex;
}
.read {
  width: 160px;
  height: 34px;
  background-color: rgba(199, 199, 199, 0.6);
  font-size: 17px;
  text-align: center;
  line-height: 35px;
}
.likeimg {
  width: 160px;
  height: 34px;
  background-color: rgba(199, 199, 199, 0.6);
  font-size: 17px;
  text-align: center;
  right: 13px;
  position: absolute;
  display: inline;
  line-height: 35px;
}
.likeimage {
  width: 20px;
}

/* 评论 */
.link-top {
  width: 332px;
  height: 1px;
  border-top: solid #acc0d8 1px;
  margin: 10px 0px 20px 20px;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.contenttime {
  font-size: 14px;
  margin-right: 2rem;
  float: right;
}
</style>