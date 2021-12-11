<template>
    <van-tabbar v-model="selectedTab" fixed @change="onChange">
        <van-tabbar-item v-for="(item, i) of tabbarItems" :key="i" :id="i"
            >{{ item.title }}
            <template #icon="props">
                <img :src="props.active ? item.selected : item.normal" />
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>

export default {    
    data() {
        return {
            selectedTab: 0, //选中的TabBar
            tabbarItems: [
                {
                    title: "首页",
                    routeName: "home",
                    normal: require("@/assets/images/homepage.png"),
                    selected: require("@/assets/images/homepage_fill.png"),
                },
                {
                    title: "消息",
                    routeName: "message",
                    normal: require("@/assets/images/interactive.png"),
                    selected: require("@/assets/images/interactive_fill.png"),
                },
                {
                    title: "视频",
                    routeName: "video",
                    normal: require("@/assets/images/live.png"),
                    selected: require("@/assets/images/live_fill.png"),
                },
                {
                    title: "我的",
                    routeName: "user",
                    normal: require("@/assets/images/people.png"),
                    selected: require("@/assets/images/people_fill.png"),
                },
            ],
        };
    },
    methods: {
        onChange(index) {
            this.$router.push({ name: this.tabbarItems[index].routeName });
        },
    },
    props:["seleted"],
    created(){
        this.selectedTab = this.seleted;
    }
};
</script>
<style scoped>
</style>
