<template>
  <div class="video_home">
    <div>
      <!-- <van-nav-bar left-text="返回" left-arrow @click-left="$router.back(-1)" /> -->
      <van-nav-bar left-text="返回" left-arrow @click-left="$router.back(-1)">
        <template #right>
          <van-cell icon="ellipsis" @click="showShare = true" />
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
          />
        </template>
      </van-nav-bar>
    </div>
    <!--视频开始-->
    <div class="vp-video">
      <div class="demo">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
    </div>
    <!--视频结束-->
    <!--内容头部开始-->
    <div class="head">
      <div class="head-text1 van-multi-ellipsis--l3">{{videos.title}}</div>
      <div class="head-text2">
        <div class="txt2" @click="getnickname(videos.userid)">
          来源:{{nickname}}
          <div class="rate">
            <van-button
              @click="AddSubscribeitem(videos.userid)"
              icon="plus"
              type="danger"
              size="mini"
            >订阅</van-button>
            <van-button
              @click="AddCollectionitem(videos.id,videos.title)"
              icon="star-o"
              type="danger"
              size="small"
              style="left:10px;"
            ></van-button>
          </div>
          <div>
            <van-rate
              v-model="videos.star"
              @change="upstar"
              :value="videos.star"
              allow-half
              void-icon="star"
              void-color="#eee"
              style="margin-top: 20px;"
            />
          </div>
          <div class="time">{{videos.time}}</div>
        </div>

        <!-- <div class="rate">
          <van-rate
            v-model="videos.star"
            @change="upstar"
            :value="videos.star"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
          <van-button
            @click="AddCollectionitem(videos.id,videos.title)"
            icon="star-o"
            style="margin-left:30px;"
            type="danger"
            size="small"
          ></van-button>
        </div>-->
      </div>
      <!--内容头部结束-->
      <!-- 简介开始 -->
      <div class="head-text3">
        <div
          style="width:7px; height:28px; background-color:red; float:left; margin:3px 10px 0px 20px;"
        ></div>
        <div style="font-size:24px; margin-top:15px">简介</div>
        <div class="text3">{{videos.introduction}}</div>
        <!-- 简介结束 -->
        <!-- 观点开始 -->
        <div
          style="width:7px; height:28px; background-color:red; float:left; margin:12px 10px 20px 20px; "
        ></div>
        <div style="font-size:24px; margin-top:20px">观点</div>
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
            v-model="videoitem.content"
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
        <!-- 观点结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import {
  getvideosDetailById,
  postUpdateStar,
  getVideoFrom
} from "@/api/videos.js";

import { AddCommentVideo, getCommentListVideo } from "@/api/comment.js";

import { AddCollection, AddSubscribe } from "@/api/collection.js";
import { mapState } from "vuex"; // mapGetters
import { Toast } from "vant";

export default {
  // name: "details",
  data() {
    return {
      userid: "66",
      nickname: "1",
      videos: {},
      Comment: {},
      stars: {
        id: "",
        star: ""
      },
      videoitem: {
        userid: "",
        videoid: "",
        content: ""
      },
      // 收藏
      collectionItem: {
        userid: "",
        articleid: "",
        videoid: "",
        title: ""
      },
      Subscribeitem: {
        userid: "",
        fuserid: ""
      },
      checked: true,
      activeIcon: "",
      inactiveIcon: "",
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" }
      ],
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "1" // url地址
          }
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    };
  },
  props: {
    id: Number
  },
  created() {
    // 调用方法
    this.getvideoInfo();
    this.getCommentInfo();
    // this.playerOptions.sources.src = this.pathurl;
    // console.log(this.pathurl);
  },
  beforeDestroy() {
    // console.log(this.playerOptions.sources[0].src);
  },
  updated() {
    this.getnickname(this.userid);
  },
  methods: {
    //上传星级
    async upstar() {
      try {
        this.stars.id = this.videos.id;
        this.stars.star = Math.round(this.videos.star * 100) / 100;
        let data = this.stars;
        let result = await postUpdateStar(data); //注意传递过去的参数star的属性名
        if (result.code === "0") {
          this.$toast("评分成功！");
          history.go(-1);
          return;
        }
        throw result;
      } catch (error) {
        this.$dialog.alert({
          title: "评分失败",
          message: error
        });
      }
    },
    // 分享
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },

    async onSubmit() {
      // 添加评论
      if (this.videoitem.content === "") {
        this.$toast("评论不能为空");
        return;
      }
      try {
        this.videoitem.userid = this.user.id;
        this.videoitem.videoid = this.id;
        console.log(this.user.headImg);
        let user = this.videoitem;
        let result = await AddCommentVideo(user); //注意传递过去的参数user的属性名
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

    async getvideoInfo() {
      // 获取新闻详情数据
      try {
        let params = { id: this.id };

        let result = await getvideosDetailById(params);
        // console.log(result.data.pathurl);
        if (result.code === "0") {
          this.videos = result.data;
          this.playerOptions.sources[0].src = result.data.pathurl;
          this.userid = result.data.userid;
          // console.log(this.playerOptions.sources.src);
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
        let params = { videoid: this.id };
        let result = await getCommentListVideo(params);
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
    async AddSubscribeitem(id) {
      // 添加订阅
      let userid = this.user.id;
      console.log(userid);
      if (userid === undefined) {
        console.log("未登录");
        Toast.fail("还没登录呢");
      } else {
        try {
          this.Subscribeitem.userid = this.user.id;
          this.Subscribeitem.fuserid = id;

          let params = this.Subscribeitem;
          console.log(params);
          let result = await AddSubscribe(params);
          if (result.code === "0") {
            console.log("订阅成功");
          } else {
            throw result.msg;
          }
        } catch (error) {
          this.dialog.alert({ title: "错误", message: error });
        }
      }
    },
    async getnickname() {
      // 根据userid获得用户名
      try {
        let params = { userid: this.userid };
        let result = await getVideoFrom(params);
        console.log(result.data[0].nickname);

        if (result.code === "0") {
          this.nickname = result.data[0].nickname;
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.dialog.alert({ title: "错误", message: error });
      }
    } //=======================================
  },

  computed: {
    ...mapState("user", ["user", "Login"])
  }
};
</script>

<style>
.video_home {
  width: 100%;
  background-color: #999;
}
.head {
  width: 100%;
  background-color: white;
}
.vp-video {
  width: 100%;
  height: 100%;
}

.head-text1 {
  width: 340px;
  height: 95px;
  font-weight: bold;
  font-size: 17px;
  margin-left: 20px;
  margin-right: 10px;
  padding-top: 10px;
  color: "#ffffff";
  overflow: hidden;
  text-overflow: ellipsis;
}
.head-text2 {
  margin-left: 20px;
  color: #999;
}
.txt2 {
  margin-top: 14px;
  font-size: 19px;
}
.van-checkbox {
  height: 70ox;
  width: 70px;
  margin-left: 310px;
  margin-bottom: 10px;
}
.img-icon {
  height: 24px;
}

.time {
  width: 120px;
  font-size: 18px;
  float: right;
  margin-top: -20px;
}
.rate {
  width: 110px;
  margin-top: -20px;
  margin: 0 auto;
  float: right;
}
.head-text3 {
  margin-top: 20px;
  width: 100%;
  height: 400px;
}
.text3 {
  margin: 20px 10px 10px 20px;
  font-size: 16px;
  color: rgb(74, 71, 71);
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