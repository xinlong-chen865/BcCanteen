import axios from "axios";
import { Toast } from 'vant';
import store from "@/store";

// 1. 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 5000 // 超时
});

// 2. 请求拦截
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 3. 响应拦截
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Toast.error(error.message);
    return Promise.reject(error);
  }
);

export default service;
