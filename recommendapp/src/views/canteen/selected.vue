<template>
    <div class="selected">
        <van-nav-bar title="精选">
		</van-nav-bar>
        <div class="selected__bg">
            <RecommendCard
                v-for="item in originList"
                :key="item.id"
                :list="item"
            />
        </div>
        <tab-nav></tab-nav>
    </div>
</template>

<script>
import tabNav from '@/components/tabNav'
import RecommendCard from '@/components/RecommendCard/index.vue'
import { RecommendUserProfile } from '@/api/main';
export default {
    components: {
        tabNav,
        RecommendCard,
    },
    data() {
        return {
            originList: [],
            list: [],
        }
    },
    methods: {
        async fetchData() {
            const { data } = await RecommendUserProfile({ userId: this.$store.state.userId });
            if (data.state === 200) {
                console.log(data);
                this.originList = data.data;
            } else {
                this.originList = [];
            }
        },
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style lang="less" scoped>
.selected {
    &__bg {
        height: 100vh;
        overflow: scroll;
        background: url('./imgs/selected_bg.png') no-repeat;
        padding: 20px 10px;
    }
}
</style>