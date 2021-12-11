<template>
    <div>
        <van-cell center v-for="item in newslist" :key="item.id"
            :to = "{ name: 'news_show', params: { id: item.id } }"
        >
            <template #icon>
                <van-image
                    :src="`${APIDomainName}${item.img}`"
                    width="48"
                    height="48"
                />
            </template>

            <template #default>
                <div class="title van-ellipsis">{{ item.title }}</div>
                <div style="display:flex;justify-content: space-between">
                    <span class="time">发表时间：{{ item.add_time }}</span>
                    <span class="count">点击：{{ item.count }}次 </span>
                </div>
            </template>
        </van-cell>
    </div>    
</template>

<script>
import { Cell, Image } from "vant";
import { getNewsList } from "@/api/news.js";
export default {
    components: {
        [Cell.name]: Cell,
        [Image.name]: Image,
    },
    data() {
        return {
            newslist: [], // 存放列表数据
        };
    },
    created() {
        // 调用方法
        this.getNewsList();
    },
    methods: {
        // 定义方法
        async getNewsList() {
            try {
                let result = await getNewsList();
                if (result.code === 1) {
                    this.newslist = result.data;
                    //console.log(this.newslist);
                } else {
                    throw result.msg;
                }
            } catch (error) {
                this.$messagebox("错误", error);
            }
        }, //=======================================
    },
};
</script>

<style lang="less" scoped>
.title {
    font-size: 14px;
    padding-left: 5px;
}
.time {
    padding-left: 5px ;
    text-overflow: ellipsis;
    color: #26a2ff;
}
.count {    
    text-align:right;
    color: #26a2ff;    
}
</style>
