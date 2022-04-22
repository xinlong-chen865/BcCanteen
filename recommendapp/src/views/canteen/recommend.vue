<template>
    <div class="recommend">
        <van-nav-bar
            title="猜你喜欢"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="recommend__list">
            <div class="loading" v-if="isloading">
                <van-loading type="spinner" />
            </div>
            <template v-else>
                <div class="loading" v-if="dataList.length === 0">
                    暂无猜你喜欢的数据
                </div>
                <van-card
                    v-else
                    v-for="item in dataList"
                    :key="item.bus_id"
                    class="recommend__card"
                    :desc="item.bus_address"
                    :title="item.bus_name"
                    :thumb="require('@/assets/img/business/' + item.bus_img)"
                    @click="routerToBusiness(item.bus_id)"
                >
                    <template #price>
                        <van-rate :value="Math.floor((Math.random() * 3) + 3)" icon="like" void-icon="like-o" />
                    </template>
                </van-card>
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Rate } from 'vant';
import { NavBar } from "vant";
import { RecommendList } from '@/api/recommend.js';
import { Loading } from 'vant';

Vue.use(Loading);
Vue.use(Rate);

export default {
    name: 'recommend',
    components: {
        NavBar,
    },
    data() {
        return {
            dataList: [],
            isloading: true,
        }
    },
    computed: {
        userId() {
            let user_id = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).id;
            return user_id;
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 请求数据
        async fetchData() {
            try {
                this.isloading = true;
                const { data } = await RecommendList({ userId: this.userId });
                this.dataList = data.data;
            } finally{
                this.isloading = false;
            }
        },
        routerToBusiness(id) {
            this.$router.push({
                path:`/canteen/goods/${id}`
            })
        }
    },
    async created() {
        await this.fetchData();
    },
}
</script>

<style lang="less" scoped>
.recommend {
    &__card {
        margin: 10px 5px;
    }
    .loading {
        width: 100%;
        padding-top: 15px;
        height: 50px;
        text-align: center;
    }
}

</style>