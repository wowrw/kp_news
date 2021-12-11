<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="学习积分" left-text="返回" left-arrow @click-left="$router.back()">
      <template #right>
        <span>积分明细</span>
      </template>
    </van-nav-bar>
    <!-- 积分数量 -->
    <div class="integral_num">
      <van-notice-bar left-icon="volume-o" text="积分获取更新公告随便加加积分获取更新公告随便加加积分获取更新公告随便加加。" />
      <div class="txt">{{points.dpoint}}积分</div>
    </div>
    <div class="m_content">
      <!-- 单元格 -->
      <van-cell
        title="单元格"
        size="large"
        label="1/分每日签到"
        value="点击签到"
        is-link
        @click="addpointitem()"
        to="/user"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">签到</span>
        </template>
      </van-cell>
      <van-cell
        title="单元格"
        size="large"
        label="1/分每日阅读文章"
        value="去看看"
        is-link
        @click="addpointitem()"
        to="/home"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">我要选读文章</span>
        </template>
      </van-cell>
      <van-cell
        title="单元格"
        size="large"
        label="1/分每日观看视频"
        value="去看看"
        is-link
        @click="addpointitem()"
        to="/video"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">视听学习</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getpointById, addPoint } from "@/api/point.js";
import { mapState } from "vuex"; // mapGetters
import { Toast } from "vant";

export default {
  name: "message_add",
  components: {},
  props: {
    fuserid: Number
  },
  data() {
    return {
      points: {}
    };
  },

  watch: {},
  created() {
    this.getpointInfo();
  },
  mounted() {},
  computed: {
    ...mapState("user", ["user", "Login"])
  },
  methods: {
    async getpointInfo() {
      // 获取积分详情数据
      let userid = this.user.id;
      console.log(userid);
      if (userid === undefined) {
        console.log("未登录");

        Toast.fail("还没登录呢");
      } else {
        try {
          let params = { fuserid: this.user.id };
          // console.log(params);

          let result = await getpointById(params);
          // console.log(result);
          if (result.code === "0") {
            this.points = result.data; //数组的第一个元素
          } else {
            throw result.msg;
          }
        } catch (error) {
          this.dialog.alert({ title: "错误", message: error });
        }
      }
    }, //=======================================
    async addpointitem() {
      // 积分加一
      try {
        let params = { fuserid: this.user.id };
        // console.log(params);
        let result = await addPoint(params);
        // console.log(result);
        if (result.code === "0") {
          console.log("积分加一");
          Toast.success("积分+1");
          // history.go(1);
          // location.reload();
        } else {
          throw result.msg;
        }
      } catch (error) {
        this.dialog.alert({ title: "错误", message: error });
      }
    },
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
.integral_num {
  height: 200px;
  width: 100%;
  background: url(https://img01.yzcdn.cn/vant/cat.jpeg);
}
.txt {
  text-align: center;
  line-height: 150px;
  color: white;
}
</style>