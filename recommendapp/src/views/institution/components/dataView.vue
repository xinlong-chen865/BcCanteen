<template>
  <div class="dataView">
    <van-row gutter="20">
        <van-col 
            class="dataView__col"
            span="8"
            v-for="item in nearbyList[typeField]"
            :key="item.id"
        >
            <img class="dataView__img" src="../../../assets/img/goods/default_img.jpeg" >
            <div v-if="item.name.length <= 15" class="dataView__name">{{ item.name }}</div>
            <marquee v-else class="dataView__scroll_name">{{ item.name }}</marquee>
            <div class="dataView__address">地址：{{ item.address }}</div>
            <div class="dataView__distance">距离：{{ item.distance }}m</div>
        </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue';
import { Col, Row } from 'vant';

Vue.use(Col);
Vue.use(Row);

export default {
  name: 'DataView',
  props: {
    nearbyList: {
        type: Object,
        default: {},
    },
    type: {
        type: String,
        default: "",
    }
  },
  computed: {
    typeField() {
        let ret;
        switch(this.type) {
        case "餐饮服务":
            ret = 'food';
            break;
        case "风景名胜":
            ret = 'scenery';
            break;
        case "购物服务":
            ret = 'shop';
            break;
        }
        return ret;
    }
  }
}
</script>

<style lang="less">
.dataView {
    padding: 20px 10px;
    background: rgba(0,0,0,0.02);
    &__col {
        height: 150px;
        text-align: center;
    }
    &__img {
        width: 80%;
        border-radius: 5px;
    }
    &__name {
        font-size: 12px;
    }
    &__scroll_name {
        font-size: 12px;
    }
    &__distance {
        font-size: 10px;
        color: #ccc;
        text-align: left;
        padding-left: 8px;
    }
    &__address {
        width: 100%;
        font-size: 10px;
        color: #ccc;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
