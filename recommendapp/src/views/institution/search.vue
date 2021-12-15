<template>
    <div>
        <van-nav-bar
            title="我的搜索"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div id="search"></div>
    </div>
    
</template>

<script>
import Vue from "vue";
import MapLoader from "@/assets/js/AMap.js";
import { NavBar } from "vant";

Vue.use(NavBar);

export default {
    mounted() {
        this.mapInit();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        mapInit() {
            MapLoader().then(
                AMap => {
                    console.log('地图加载成功');
                    this.handleSearch(AMap);
                },
                e => {
                    console.log('地图加载失败', e);
                }
            );
        },
        handleSearch(AMap) {
            //构造地点查询类
            let placeSearch = new AMap.PlaceSearch({ 
                pageSize: 10, // 单页显示结果条数
                pageIndex: 1, // 页码
                city: "010", // 兴趣点城市
                citylimit: true,  //是否强制限制在设置的城市内搜索
                panel: "search", // 结果列表将在此容器中进行展示。
            })
            //关键字查询
            placeSearch.search(this.$route.params.name);
        }
    }
}
</script>

<style lang="less" scoped>
.search {
    width: 95vw;
    height: 100vh;
    margin: 0 auto;
}
</style>