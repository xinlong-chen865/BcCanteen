<template>
  <div id="canteenGoods">
    <van-nav-bar
      :title="busData.bus_name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 用户信息 -->
    <div class="busTitle">
      <div class="titleLeft">
        <img :src="change_bus_img" />
      </div>
      <div class="titleRight">
        <span class="name">店名：{{ busData.bus_name }}</span>
        <span class="address">地址：{{ busData.bus_address }}</span>
        <span class="phone">电话：{{ busData.bus_phone }}</span>
        <span class="sales">月销量：{{ busData.bus_sales }}单</span>
      </div>
    </div>
    <!-- 菜品列表 -->
    <div class="goodsList" v-for="(item, index) in goodsList" :key="index">
      <div class="goodsImg">
        <img :src="item.goods_img" @load="loadEvent" />
      </div>
      <div class="goodsCon">
        <span class="name">{{ item.goods_name }}</span>
        <span class="sales">月销量{{ item.goods_total }}单</span>
        <span class="price">￥{{ item.price }}</span>
      </div>
      <div class="add" id="add">
        <van-icon name="add" @click="showDesc(item.id)" />
      </div>
    </div>
    <!-- 弹出层 菜品 -->
    <van-popup id="goodsPop" v-model="showPop" closeable close-icon="close">
      <div class="popImg">
        <img :src="goodsDesc.goods_img" />
      </div>
      <div class="popDesc">
        <span class="descName">菜名：{{ goodsDesc.goods_name }}</span>
        <span class="descPrice">价格：￥{{ goodsDesc.price }}</span>
        <div class="count">
          <div id="reduceCount" @click="reduce">-</div>
          <input type="text" id="countData" v-model="count" />
          <div id="addCount" @click="add">+</div>
          <div id="join" @click="buyEvent">加入购物车</div>
        </div>
      </div>
    </van-popup>

    <!-- 弹出层 购物车 -->
    <van-popup id="cartPop" v-model="showCart" closeable close-icon="close">
      <div class="title">购物车</div>
      <van-card
        v-for="(item2, index2) in goodsCartDesc"
        :key="index2"
        :num="item2.count"
        :price="item2.price"
        :title="item2.goods_name"
        :thumb="item2.goods_img"
      ></van-card>
      <div class="cartBuyContent">
        <div class="allPrice">
          共计<span>{{ sumCount.price }}</span
          >元,共<span>{{ sumCount.sum }}</span
          >件
        </div>
        <div class="cartBuy" @click="handleToPay">立刻购买</div>
      </div>
    </van-popup>

    <!-- 购物车 -->
    <van-goods-action class="goodsAction">
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="sumCount.sum"
        @click="cartDesc"
      />
      <van-goods-action-icon
        icon="star-o"
        text="收藏"
        @click="collectEvent"
        ref="star"
      />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from "vue";
import {
  GoodsDesc,
  InsertOrder,
  IdToBusiness,
  GoodsLists,
  PayingItem,
  InsertFootprint,
} from "../../api/goods";
import { GetInfo } from '@/api/info'
import serialNumber from "@/assets/util/serialNumber";
import { NavBar } from "vant";
import { Icon } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import { Popup } from "vant";
import { Toast } from "vant";
import { Card } from "vant";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Card);

export default {
  props: ["bid"],
  data() {
    return {
      collect: false, //是否收藏
      showPop: false, //展示详情商品小页面
      showCart: false, //展示购物车

      busData: {},
      goodsList: [], //商品列表
      goodsDesc: [], //商品详情页

      count: null, //商品数量
      goodsId: "", //加入购物车商品的id
      goodsCart: [], //加入购物车的商品
    };
  },
  methods: {
    loadEvent() {
      this.$loading.hide();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    collectEvent() {
      this.collect = !this.collect;

      let node = this.$refs.star;
      console.log(node);
      node.text = this.coll.text;
      node.icon = this.coll.icon;
    },
    //商品遮罩
    async showDesc(id) {
      this.showPop = !this.showPop;
      let result3 = await GoodsDesc({ id: id });
      this.goodsDesc = result3.data[0];
      //添加购物车的商品id
      this.goodsId = id;
      this.count = 0;
    },
    reduce() {
      if (this.count <= 0) {
        Toast.fail("不能再少了！");
      } else {
        this.count--;
      }
    },
    add() {
      this.count++;
    },
    //遮罩中的购买事件
    buyEvent() {
      if (this.count <= 0) {
        Toast.fail("不能添加0个商品到购物车");
      } else {
        let goodsObj = {
          id: this.goodsId,
          count: this.count,
        };
        //加入本页面购物车
        if (this.goodsCart.length == 0) {
          this.goodsCart.push(goodsObj);
        } else {
          //判断是不是已经有的商品了
          this.goodsCart.forEach((item) => {
            console.log(item.id, goodsObj.id);
            if (item.id == goodsObj.id) {
              item.count = item.count + goodsObj.count;
            } else {
              this.goodsCart.push(goodsObj);
            }
          });
        }
        this.showPop = false;
      }
    },
    //查看页面购物车
    cartDesc() {
      this.showCart = !this.showCart;
    },
    //购买事件
    async handleToPay() {
      // 购买之前，先检验是否填写了收货地址
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await GetInfo({ id: userInfo.id })
      if (!data.data.phone && !data.data.address) {
        Toast.fail('请填写收货地址')
        this.$router.push({
          path: `/canteen/info?redirect=${this.$route.path}`
        });
        return;
      }
      //把购物车里面的消息 发给后端
      //并且跳转到支付页面
      let payId = serialNumber.serialNum;
      let user_id = JSON.parse(localStorage.getItem("userInfo")).id;
      let sum = this.sumCount.sum;
      let all_price = this.sumCount.price;
      let business_id = this.bid;
      let payList = Array.from(this.goodsCart);
      payList.map((item) => {
        item.payId = payId;
        item.user_id = user_id;
        item.sum = sum;
        item.all_price = all_price;
        item.business_id = business_id;
        return item;
      });
      console.log(payList);

      payList.forEach(async (item) => {
        //插入数据库订单数据
        await InsertOrder({
          payId: item.payId,
          user_id: item.user_id,
          business_id: item.business_id,
          id: item.id,
          sum: item.count,
          all_price: item.all_price,
        });
      });
      //跳转至支付页面，并且传入订单id
      this.handleToPayPage(payId, "缴费");
    },
    //跳转到支付页面
    async handleToPayPage(payId, subject) {
      const { data } = await PayingItem({ id: payId, subject });
      let url = data.url;
      window.location.href = url;
    },
    async insertFootprint() {
      const user_id = JSON.parse(localStorage.getItem('userInfo')).id
      await InsertFootprint({ bus_id: this.bid, user_id });
    }
  },
  computed: {
    //收藏
    coll: function() {
      if (this.collect == true) {
        return {
          text: "已收藏",
          icon: "star",
        };
      } else {
        return {
          text: "收藏",
          icon: "star-o",
        };
      }
    },
    //购物车显示的数量
    sumCount: function() {
      let sum = 0;
      let price = 0;
      this.goodsCartDesc.forEach((item) => {
        sum += item.count;
        price += item.price * item.count;
      });
      return { sum, price };
    },
    //通过id补全cart的信息
    goodsCartDesc: function() {
      let cartList = [];
      this.goodsList.forEach((item) => {
        this.goodsCart.forEach((item2) => {
          if (item.id === item2.id) {
            item.count = item2.count;
            cartList.push(item);
          }
        });
      });
      return cartList;
    },
    //webpack 商家图片
    change_bus_img: function() {
      return require(`../../assets/img/business/${this.busData.bus_img}`);
    },
  },
  created() {
    //this.$loading.show("请稍等,正在加载...");
  },
  async mounted() {
    let result = await IdToBusiness({ id: this.bid });
    this.busData = result.data[0];

    let result2 = await GoodsLists({ bus_id: this.bid });
    this.goodsList = result2.data;
    // 曝光
    this.insertFootprint();
  },
};
</script>

<style lang="less">
#canteenGoods {
  .busTitle {
    box-sizing: border-box;
    width: 100%;
    height: 20vh;
    padding: 5px;
    background-color: #dddddd;
    display: flex;
    margin-bottom: 0.625rem;
    .titleLeft {
      flex: 1;
      img {
        width: 80%;
        height: 50%;
        margin-top: 15px;
        border: 1px solid red;
        padding: 2px;
      }
    }
    .titleRight {
      flex: 3;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      span {
        color: darkred;
        font-size: 14px;
      }
    }
  }
  .goodsList {
    width: 100%;
    height: 15vh;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    .goodsImg {
      width: 40vw;
      img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0.3125rem;
      }
    }
    .goodsCon {
      width: 40vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        font-size: 1.25rem;
        font-weight: 900;
      }
      .sales {
        font-size: 0.75rem;
        color: #9a9a9a;
      }
      .price {
        font-size: 1.125rem;
      }
    }
  }
  .add {
    width: 15vw;
    position: relative;
    z-index: 200;
    .van-icon {
      font-size: 1.5rem;
      margin-top: 50%;
    }
  }
  #goodsPop {
    width: 80%;
    height: 50%;
    display: flex;
    flex-direction: column;
    .popImg {
      width: 100%;
      height: 60%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .popDesc {
      flex: 1;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .descName {
      }
      .descPrice {
      }
      .count {
        width: 100%;
        height: 25%;
        display: flex;
        #reduceCount {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 1px;
          font-size: 20px;
          font-weight: 900;
        }
        #addCount {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 20px;
          font-weight: 900;
        }
        #countData {
          width: 40px;
          height: 30px;
          text-align: center;
        }
        #join {
          width: 90px;
          height: 30px;
          line-height: 30px;
          border-radius: 20px;
          background: #fa282b;
          color: #fff;
          text-align: center;
        }
      }
    }
    .van-icon-close {
      z-index: 20;
      color: #000000;
    }
  }
  #cartPop {
    width: 80%;
    height: 70%;
    overflow-y: scroll;
    .title {
      width: 100%;
      height: 25px;
      line-height: 25px;
      padding-left: 20px;
      font-size: 16px;
    }
    .van-icon-close {
      z-index: 20;
      color: #000000;
      margin-top: -10px;
    }
    .van-card__content {
      justify-content: space-around;
    }

    .cartBuyContent {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 50px;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 0 10px;
      background: #eee;
      .allPrice {
        flex: 1;
        font-size: 14px;
        span {
          font-size: 18px;
        }
      }
      .cartBuy {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 10px;
        background: #eedf30;
      }
    }
  }
  .goodsAction {
    z-index: 200;
  }
}
</style>
