<template>
    <div class="recommend_card" @click="routerToBusiness">
        <div class="recommend_card__left">
            <img :src="require('@/assets/img/business/' + list.bus_img)" alt="">
        </div>
        <div class="recommend_card__right">
            <div class="recommend_card__title">{{ list.bus_name }}</div>
            <van-tag type="success">{{ formatTag(list.category_id) }}</van-tag>
            <div class="recommend_card__childList">
                <div v-for="(item, index) in list.childList" :key="index" class="childCard">
                    <img :src="item.goods_img" alt="">
                    <div class="childCard_name">{{item.goods_name  }}</div>
                    <div class="childCard_price">${{ item.price }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Tag } from 'vant';

Vue.use(Tag);
export default {
    props: {
        list: {
            type: Object,
            default: () => ({}),
        }
    },
    methods: {
        formatTag(index) {
            const dict = ['快餐','面条','辣椒','汉堡','烧烤','西餐','粥汤','水饺']
            return dict[index - 1];
        },
        routerToBusiness() {
            this.$router.push({
                path:`/canteen/goods/${this.list.id}`
            })
        },
    }
}
</script>

<style lang="less" scoped>
.recommend_card {
    height: 148px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 10px;
    display: flex;
    &__left {
        min-width: 120px;
        max-width: 120px;
        padding: 10px;
        img {
            border-radius: 10px;
            width: 100%;
            height: 100%;
        }
    }
    &__right {
        flex: 1;
        padding: 10px 0px;
    }
    &__title {
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    &__childList {
        height: 90px;
        width: 200px;
        display: flex;
        overflow-x: auto;
        padding: 5px;
        .childCard {
            display: block;
            width: 80px;
            margin-right: 15px;
            img {
                width: 80px;
            }
            .childCard_name {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
            }
            .childCard_price {
                font-size: 12px;
            }
        }
    }
}
</style>