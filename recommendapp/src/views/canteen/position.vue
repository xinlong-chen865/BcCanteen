<template>
  <div class="test">
    <van-nav-bar
      title="我的位置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div id="container"></div>
  </div>
</template>
<script>
import Vue from "vue";
import MapLoader from "@/assets/js/AMap.js";
import { NavBar } from "vant";

Vue.use(NavBar);

export default {
  name: "test",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    let that = this;
    MapLoader().then(
      (AMap) => {
        console.log("地图加载成功");
        this.mapInit(that);
        this.markInit(that);
      },
      (e) => {
        console.log("地图加载失败", e);
      }
    );
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    mapInit(that) {
      that.map = new AMap.Map("container", {
           zoom: 13,
      });
      that.map.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
          convert: true,
          showButton: true,
          buttonPosition: "LB",
          buttonOffset: new AMap.Pixel(10, 20),
          showMarker: true,
          showCircle: true,
          panToLocation: true,
          zoomToAccuracy: true,
        });
        geolocation.getCurrentPosition();
      });
    },
    markInit(that) {
        let marker = new AMap.Marker({
          position: that.map.getCenter(),
          icon: new AMap.Icon({
            image: require('@/assets/dw.png'),//定位点显示的图标
            size: new AMap.Size(60, 60), // 图标大小
            imageSize: new AMap.Size(30, 30)
          }),
          offset: new AMap.Pixel(-30, -60) //图标点的位置
        })
        marker.setMap(that.map)
    }
  },
};
</script>

<style scoped>
.test {
  width: 100vw;
  height: 100vh;
}
#container {
  width: 100%;
  height: 100%;
}
</style>
