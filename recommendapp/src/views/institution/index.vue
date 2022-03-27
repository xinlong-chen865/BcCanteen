<template>
  <div class="institution">
    <!-- 搜索框 -->
    <form action="/">
      <van-search v-model="searchData" show-action placeholder="请输入设施地点" @search="onSearch" @cancel="onCancel" />
    </form>
    <!-- 横向滚动 -->
    <div id="scroll">
      <marquee id="scrollItem"></marquee>
    </div>
    <van-row gutter="20" justify="center">
      <van-col span="8" class="institution__icon" @click="handleClickType(1)">
        <svg
          t="1637477551499"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2473"
          width="30"
          height="30"
        >
          <path
            d="M502.3 656.5C423.4 745.7 334 848.7 316.1 866.6c-30.2 30.2-68.9 33.7-98.6 4-29.7-29.7-26.1-68.4 4-98.6 18.2-18.2 124.2-110.2 214.3-190l66.4-59.3c29.3-26.5 51.9-47.6 61.5-58 40.1-43.6 7.8-139.6 42-171.5 34.2-31.9 205.2-164.9 205.2-164.9l148.8 148.8S826.7 448 794.8 482.3c-31.9 34.2-127.8 1.9-171.5 42-9.9 9.1-29.7 30.2-54.6 57.7l-66.4 74.5z"
            fill="#5FE0A3"
            p-id="2474"
          ></path>
          <path
            d="M792.4 871.9c29.7-29.7 26.1-68.4-4-98.5-30.2-30.2-302.1-263.6-342.2-307.2-40.1-43.6-1.8-89.4-42-171.5S227.7 158.4 227.7 158.4c-22.9-9.9-85.5-29.1-131.7 17.1-46.2 46.2-27 108.9-17.1 131.7 0 0 54.2 136.3 136.3 176.5 82.1 40.2 127.8 1.9 171.5 42 43.6 40.1 277.1 312 307.2 342.2 30.2 30.1 68.9 33.6 98.5 4z"
            fill="#FFE91F"
            p-id="2475"
          ></path>
          <path d="M938.033 182.974L715.79 405.216l-29.698-29.698 222.242-222.242z" fill="#333333" p-id="2476"></path>
          <path
            d="M802.4 757.2c-12.5-12.5-60.8-54.9-122-108.7-25.1-22-51.9-45.6-78-68.7 18.6-20.3 31.4-33.7 38.3-40 16.9-15.6 49.2-16.7 80.5-17.8 34.8-1.2 70.9-2.5 92.1-25.3 32.1-34.5 160.7-199.6 166.1-206.6l-33.1-25.8C945 266.1 813.5 435 782.6 468.1c-9.4 10.1-36.6 11.1-62.9 12-37.1 1.3-79 2.8-107.4 28.9-7.8 7.2-21.4 21.4-41.3 43.1-11.7-10.4-22.9-20.4-33.6-29.9 22.8-20.8 37.5-35 44.9-43 26.1-28.4 27.5-70.4 28.9-107.4 0.9-26.3 1.9-53.5 12-62.9 33.2-30.9 202-162.4 203.7-163.7l-25.8-33.1c-7 5.5-172.1 134-206.6 166.1-22.8 21.3-24.1 57.3-25.3 92.1-1.1 31.2-2.3 63.5-17.8 80.5-6.8 7.4-22 21.9-45.3 43.2-21.5-19.6-37.8-35-45.3-43.2-14.1-15.3-14.9-29.6-15.4-57.7-0.5-28.4-1.1-63.6-23.2-108.7C379.5 197.2 244 141.6 234.9 138c-12.4-5.3-37.3-14.1-66.5-14.1-34.2 0-64.7 12.4-88.1 35.8-23.8 23.8-36.1 54.8-35.7 89.7 0.3 28.6 8.9 52.9 14.1 64.9 3.7 9.1 59.2 144.6 146.4 187.3 45.1 22.1 80.4 22.7 108.7 23.2 28.2 0.5 42.4 1.3 57.7 15.4 7.5 6.9 21 21.1 38.3 40-25.9 22.9-52.4 46.1-78.1 68.8-61.1 53.7-109.4 96.1-121.8 108.6-18.8 18.8-29.3 40.6-30.6 63.2-1.3 23.9 7.9 46.4 26.5 65.1 17.5 17.5 38.4 26.7 60.6 26.7 1.5 0 3 0 4.5-0.1 22.6-1.2 44.4-11.8 63.2-30.6 12.5-12.5 54.8-60.6 108.4-121.6 20.9-23.8 42.4-48.2 63.6-72.3 21.4 24.2 43.1 48.9 63.5 72.1 53.7 61.1 96.1 109.3 108.5 121.8 19.8 19.8 43.8 30.7 67.5 30.7 22.3 0 43.3-9.2 60.7-26.7 18.7-18.7 27.9-41.2 26.5-65.1-1.1-23-11.7-44.8-30.4-63.6zM411 732.1c-48.9 55.6-95 108.1-106.5 119.6-11.3 11.3-23.7 17.7-35.8 18.3-11.8 0.7-22.9-4.2-33.1-14.3-10.1-10.1-15-21.3-14.3-33.1 0.7-12.1 7-24.4 18.3-35.8 11.5-11.5 64.1-57.8 119.9-106.7C385.4 657.4 412 634 438 611c12.5 13.9 26 29.1 40 44.9-22.3 25.3-45 51.1-67 76.2z m365.7 123.7c-9.5 9.5-20 14.4-31 14.4-12.7 0-25.8-6.4-37.9-18.4-11.5-11.5-57.7-64.1-106.7-119.8-81.5-92.9-174-198.1-201.1-223-27.8-25.5-57.1-26-85.4-26.5-26.7-0.5-54.3-0.9-91-18.9-73.7-36.1-125.5-164.1-126-165.4-0.1-0.2-0.2-0.4-0.2-0.6-26.8-62.1 2.9-98.8 12.7-108.6 15.6-15.6 35.2-23.5 58.4-23.5 22.8 0 42.7 7.5 50.2 10.8 0.2 0.1 0.4 0.2 0.6 0.2 0.3 0.1 32.9 13.2 70 35.8 47.7 29.1 80.7 60.3 95.4 90.2 18 36.7 18.4 64.3 18.9 91 0.5 28.4 1 57.7 26.5 85.4 24.9 27.1 130 119.5 222.8 201 55.8 49 108.5 95.3 120 106.9 11.3 11.3 17.7 23.7 18.3 35.8 0.5 11.9-4.4 23-14.5 33.2z"
            fill="#333333"
            p-id="2477"
          ></path>
        </svg>
        <div>餐饮服务</div>
      </van-col>
      <van-col span="8" class="institution__icon" @click="handleClickType(2)">
        <svg
          t="1637477883209"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1888"
          width="30"
          height="30"
        >
          <path d="M353.104 370.758h317.794v105.932H353.104z" fill="#FFCF65" p-id="1889"></path>
          <path d="M211.862 723.862h600.276v194.206H211.862z" fill="#FF4B4B" p-id="1890"></path>
          <path d="M264.828 582.62h494.344v105.932H264.828z" fill="#FFCF65" p-id="1891"></path>
          <path
            d="M264.828 582.62h494.344v52.966H264.828zM353.104 370.758h317.794v52.966H353.104z"
            fill="#FFB450"
            p-id="1892"
          ></path>
          <path
            d="M852.438 724.19l-93.266-53.294H264.828l-93.266 53.294c-8.256 4.718-4.908 17.326 4.602 17.326H847.84c9.508 0.002 12.856-12.606 4.598-17.326zM512 141.242c-55.266 106.386-164.592 154.386-209.522 170.232-9.04 3.186-11.556 14.762-4.778 21.54l55.404 55.402h317.794l55.404-55.404c6.778-6.778 4.262-18.352-4.778-21.54-44.932-15.844-154.258-63.844-209.524-170.23z"
            fill="#625D6B"
            p-id="1893"
          ></path>
          <path
            d="M512 123.586m-35.31 0a35.31 35.31 0 1 0 70.62 0 35.31 35.31 0 1 0-70.62 0Z"
            fill="#FFCF65"
            p-id="1894"
          ></path>
          <path
            d="M670.896 459.034H353.104l-142.452 63.312c-7.924 3.522-9.852 13.9-3.718 20.032l57.896 57.898h494.344l57.896-57.896c6.132-6.132 4.206-16.51-3.718-20.032l-142.456-63.314z"
            fill="#504B5A"
            p-id="1895"
          ></path>
          <path
            d="M819.714 529.656c-1.066-3.058-3.05-5.836-6.364-7.31l-142.454-63.312H353.104l-142.452 63.314c-3.314 1.472-5.298 4.25-6.364 7.31h615.428v-0.002z"
            fill="#625D6B"
            p-id="1896"
          ></path>
          <path
            d="M728.306 317.794H295.694c-2.508 4.802-2.31 10.9 2.006 15.218l55.404 55.402h317.794l55.404-55.404c4.316-4.314 4.512-10.414 2.004-15.216z"
            fill="#504B5A"
            p-id="1897"
          ></path>
          <path
            d="M211.862 741.518h600.276v35.31H211.862zM564.966 476.69h-105.932a17.658 17.658 0 0 1-17.656-17.656v-123.586a17.658 17.658 0 0 1 17.656-17.656h105.932a17.658 17.658 0 0 1 17.656 17.656v123.586a17.658 17.658 0 0 1-17.656 17.656z"
            fill="#FFB450"
            p-id="1898"
          ></path>
          <path d="M476.69 353.104h70.62v88.276h-70.62z" fill="#5091D7" p-id="1899"></path>
          <path
            d="M529.656 812.138h-35.31a17.658 17.658 0 0 0-17.656 17.656v88.276h70.62v-88.276a17.654 17.654 0 0 0-17.654-17.656zM370.758 812.138h-35.31a17.658 17.658 0 0 0-17.656 17.656v88.276h70.62v-88.276a17.654 17.654 0 0 0-17.654-17.656zM688.552 812.138h-35.31a17.658 17.658 0 0 0-17.656 17.656v88.276h70.62v-88.276a17.654 17.654 0 0 0-17.654-17.656z"
            fill="#504B5A"
            p-id="1900"
          ></path>
          <path
            d="M441.38 918.068H35.31v-52.966a17.658 17.658 0 0 1 17.656-17.656h370.758a17.658 17.658 0 0 1 17.656 17.656v52.966zM988.69 918.068H582.62v-52.966a17.658 17.658 0 0 1 17.656-17.656h370.758a17.658 17.658 0 0 1 17.656 17.656v52.966z"
            fill="#EDEDEE"
            p-id="1901"
          ></path>
          <path
            d="M1006.344 935.724H17.656a17.658 17.658 0 0 1 0-35.312h988.69a17.658 17.658 0 0 1 17.656 17.656 17.656 17.656 0 0 1-17.658 17.656z"
            fill="#DCDBDE"
            p-id="1902"
          ></path>
        </svg>
        <div>风景名胜</div>
      </van-col>
      <van-col span="8" class="institution__icon" @click="handleClickType(3)">
        <svg
          t="1637477857745"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8994"
          width="30"
          height="30"
        >
          <path
            d="M71.541492 352.080994m4.985128-1.537436l663.279817-204.558506q4.985128-1.537436 6.522564 3.447692l204.558506 663.279817q1.537436 4.985128-3.447692 6.522564l-663.279817 204.558506q-4.985128 1.537436-6.522564-3.447692l-204.558506-663.279817q-1.537436-4.985128 3.447692-6.522564Z"
            fill="#EBA05E"
            p-id="8995"
          ></path>
          <path
            d="M553.355502 848.003012c-107.780006 0-245.53745-104.901761-296.292222-274.024369a13.549597 13.549597 0 0 1 25.955605-7.786681c56.92244 189.809996 213.889601 274.19141 301.174959 250.857064 42.40272-11.230296 84.098729-50.831867 111.621949-105.916856 45.602198-91.230095 46.977075-204.740893 3.854793-311.364461a13.549597 13.549597 0 0 1 25.120399-10.163804c46.116171 113.806332 44.407213 235.425044-4.65145 333.645163-31.416561 62.858821-78.380786 106.649267-128.929968 119.999699a147.934097 147.934097 0 0 1-37.854065 4.754245z"
            fill="#FFFFFF"
            p-id="8996"
          ></path>
          <path
            d="M709.868041 159.065951a40.655214 81.310429 12.91 1 0 36.332791-158.510163 40.655214 81.310429 12.91 1 0-36.332791 158.510163Z"
            fill="#EBA05E"
            p-id="8997"
          ></path>
          <path
            d="M804.086089 222.704438a40.655214 81.310429 42.8 1 0 110.491327-119.31978 40.655214 81.310429 42.8 1 0-110.491327 119.31978Z"
            fill="#EBA05E"
            p-id="8998"
          ></path>
        </svg>
        <div>购物服务</div>
      </van-col>
    </van-row>
    <div ref="my_pull">
      <data-view 
        :nearbyList="nearbyList"
        :type="typeList.type"
      >
      </data-view>
    </div>
    <div class="isbottom" v-if="isbottom">
        <span>加载中，请稍后</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MapLoader from '@/assets/js/AMap.js';
import DataView from './components/dataView.vue';
import { Search, Col, Row, Toast } from 'vant';

Vue.use(Col);
Vue.use(Row);
Vue.use(Search);

export default {
  components: {
    DataView,
  },
  data() {
    return {
      // 搜索信息
      searchData: '',
      typeList: {
        type: '餐饮服务',
        pageSize: 20,
        pageIndex: 1,
        cpoint: null,
      },
      // AMap的实例
      mapObject: null,
      nearbyList: {
        food: [],
        scenery: [],
        shop: [],
      },
      clientHeight: null,
      el: null,
      isbottom: false,
    };
  },
  methods: {
    onSearch() {
      this.$router.push({path: `/institution/search/${this.searchData}`});
    },
    onCancel() {
      this.searchData = '';
    },
    textScroll(x, y, text) {
      let eleId = document.getElementById('scrollItem');
      eleId.style.left = x + 'px';
      eleId.style.top = x + 'px';
      eleId.innerHTML = text;
    },
    handleClickType(index) {
      for(const key in this.nearbyList) {
        this.nearbyList[key] = [];
      }
      switch(index) {
        case 1:
          this.typeList.type = '餐饮服务'
          break;
        case 2:
          this.typeList.type = '风景名胜'
          break;
        case 3:
          this.typeList.type = '购物服务'
          break;
      }
      this.handleAround(this);
    },
    handleScroll() {
      let a = this.el.getBoundingClientRect().bottom;
      a = Math.ceil(a);
      if (a == this.clientHeight) {
        this.isbottom = true;
        console.log('到底了');
        this.typeList.pageIndex += 1;
        this.handleAround(this, true);
      }
    },
    mapInit() {
      let that = this;
      MapLoader().then(
        AMap => {
          console.log('地图加载成功');
          this.handleCurrPos(that);
        },
        e => {
          console.log('地图加载失败', e);
        }
      );
    },
    // 获取我的经纬度
    handleCurrPos(that) {
      if (!that.mapObject) {
        that.mapObject = new AMap.Map('container');
      }
      that.mapObject.plugin('AMap.Geolocation', function() {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 1000,
          buttonPosition: 'RB',
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
        });
        geolocation.getCurrentPosition(function(status, result) {
          console.log(status, result);
          if (status == 'complete') {
            const arr = [result.position.lng, result.position.lat];
            that.typeList.cpoint = arr;
          } else {
            Toast.fail('定位失败，默认定位为天安门，或更换浏览器');
            that.typeList.cpoint = [116.405467, 39.907761];
          }
          // 获得我的经纬度后，再调用
          that.handleAround(that);
        });
      });      
    },
    // 获取我周围的设施
    handleAround(that, isbottom) {
      AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        let placeSearch = new AMap.PlaceSearch({ 
          type: that.typeList.type, // 兴趣点类别
          pageSize: that.typeList.pageSize, // 单页显示结果条数
          pageIndex: that.typeList.pageIndex, // 页码
          city: "010", // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
        });
        placeSearch.searchNearBy('', that.typeList.cpoint, 2000, function(status, result) {
          if (status === "complete") {
            switch(that.typeList.type) {
            case "餐饮服务":
              that.nearbyList.food = that.nearbyList.food.concat(result.poiList.pois);
              console.log(status, result);
              break;
            case "风景名胜":
              that.nearbyList.scenery = that.nearbyList.scenery.concat(result.poiList.pois);
              break;
            case "购物服务":
              that.nearbyList.shop = that.nearbyList.shop.concat(result.poiList.pois);
              break;
            }
          } else {
            Toast.error("加载失败...");
          }
          // 按需加载
          if(isbottom) that.isbottom = false;
        });
      });
    }
  },
  mounted() {
    let text = '欢迎光临，顺义大明白App~~~';
    this.textScroll(5, 0, text);
    // 初始化高德地图
    this.mapInit();
    // 处理到底按需加载
    this.clientHeight = document.documentElement.clientHeight;
    this.$nextTick(() => {
      this.el = this.$refs.my_pull;
      window.addEventListener('scroll', this.handleScroll)
    })
  },
};
</script>

<style lang="less">
.institution {
  #scroll {
    width: 100%;
    height: 30px;
    margin-bottom: 5px;
    text-align: center;
    position: relative;
    marquee {
      width: 95%;
      height: 30px;
      position: absolute;
    }
  }
  &__icon {
    text-align: center;
    div {
      margin-top: 10px;
    }
  }
  .isbottom {
    width: 100vw;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #search {
    width: 80vw;
    height: 100vh;
    margin: 0 auto;
  }
}
</style>
