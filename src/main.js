import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.less";
Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// Vue.prototype.$message=mess

// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

import VerifyFunction from '../src/utils/VerifyFunction'
Vue.use(VerifyFunction)

import './utils/tooles'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");