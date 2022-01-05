import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

//用户模块
import Login from "@/views/user/login";
import Register from "@/views/user/register";

//食堂模块
import canteenMain from "@/views/canteen/main";
import canteenCategory from "@/views/canteen/category";
import canteenOrder from "@/views/canteen/order";
import canteenMy from "@/views/canteen/my";
import canteenSearch from "@/views/canteen/search";
import canteenCategoryList from "@/views/canteen/categoryList";
import canteenGoods from "@/views/canteen/goods";
import canteenPay from "@/views/canteen/pay";
import canteenPosition from "@/views/canteen/position";
import canteenInfo from "@/views/canteen/info";

//设施模块
import Institution from "@/views/institution";
import Search from "@/views/institution/search";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  //用户模块
  {
    path: "/user/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/register",
    name: "Register",
    component: Register,
  },

  //食堂模块的路由
  {
    path: "/canteen/main",
    name: "canteenMain",
    component: canteenMain,
  },
  {
    path: "/canteen/category",
    name: "canteenCategory",
    component: canteenCategory,
  },
  {
    path: "/canteen/search",
    name: "canteenSearch",
    component: canteenSearch,
  },
  {
    path: "/canteen/order",
    name: "order",
    component: canteenOrder,
  },
  {
    path: "/canteen/my",
    name: "canteenMy",
    component: canteenMy,
  },
  {
    path: "/canteen/info",
    name: "canteenInfo",
    component: canteenInfo,
    meta: { requiresAuth: true },
  },
  {
    props: true,
    path: "/canteen/categorylist/:id",
    name: "canteenCategoryList",
    component: canteenCategoryList,
  },
  {
    props: true,
    path: "/canteen/position",
    name: "canteenPosition",
    component: canteenPosition,
  },
  //商品
  {
    props: true,
    path: "/canteen/goods/:bid",
    name: "canteenGoods",
    component: canteenGoods,
    meta: { requiresAuth: true },
  },
  {
    path: "/canteen/pay",
    name: "canteenPay",
    component: canteenPay,
    meta: { requiresAuth: true },
  },
  //热点设施
  {
    path: "/institution",
    name: "institution",
    component: Institution
  },
  {
    path: "/institution/search/:name",
    name: "search",
    component: Search
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (to.meta.requiresAuth && !userInfo) {
    next({
      path: `/user/login?redirect=${to.path}`,
    });
  } else {
    next();
  }
});

export default router;