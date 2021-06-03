/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Home1 from "../views/Home1.vue";
import Layout from '../views/Layouts'
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "首页",
    component: Layout,
    redirect: "/index",
    children: [
        {
            path: "/index",
            name: "home1",
            component: Home,
        },
        {
            path: "/index1",
            name: "home2",
            component: Home1,
        },
    ]
}];

const router = new VueRouter({
    routes
});

export default router;