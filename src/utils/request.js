/* eslint-disable prettier/prettier */
import axios from "axios";
import { VueAxios } from "./axios";

// 创建 axios 实例
const service = axios.create({
    // baseURL: 'auth', // api base_url
    // timeout: 100000 // 请求超时时间
});

const err = error => {
    if (error.response) {
        let data = error.response.data;
        switch (error.response.status) {
            case 403:
                break;
            case 404:
                break;
            case 302:
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
};
service.interceptors.request.use(
    config => {
        // 判断登录
        // const token = localStorage.getItem('token')
        // if (token) {
        //   config.headers[ 'X-Access-Token' ] = token
        // } else {
        //   router.push('/login')
        // }
        // if(config.method=='get'){
        //   if(config.url.indexOf("sys/dict/getDictItems")<0){
        //     config.params = {
        //       _t: Date.parse(new Date())/1000,
        //       ...config.params
        //     }
        //   }
        // }
        // if (config.method === "put") {
        //   config.data = qs.stringify(config.data)
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(response => {
    return response.data;
}, err);

const installer = {
    vm: {},
    install(Vue, router = {}) {
        Vue.use(VueAxios, router, service);
    }
};

export { installer as VueAxios, service as axios };