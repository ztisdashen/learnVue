// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '/components/HelloWorld'
//
// Vue.use(Router)
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
import VueRouter from "vue-router";

import Vue from "vue";
// import HelloWorld from "@/components/HelloWorld";
// 1. 通过Vue.use()传入插件，安装插件
Vue.use(VueRouter);
// 2. 创建VueRouter对象
// import Home from "../components/Home";
// import About from "../components/About";
// import User from "../components/User";
const User = () => import("../components/User");  // 懒加载写法
const About = () => import("../components/About");
const Home = () => import("../components/Home");
const Msg = () => import("../components/HomeMsg");
const News = () => import("../components/HomeNews");
const Profile = () => import("../components/Profile")
const router = new VueRouter({
  mode: 'history',
  // 配置路由与组件之间的关系
  routes: [{
    path: '',
    // component: Home,
    redirect: '/home',
    meta:{
      title: '首页'
    }
  },
    {
      path: "/home",
      component: Home,
      children: [{
        path: '',
        redirect: 'news'   //默认路径
      }, {
        path: 'news', // 不加 ‘/’
        component: News
      }, {
        path: 'msg',
        component: Msg
      }],
      meta:{
        title: '首页'
      }

    }, {
      path: "/about",
      component: About,
      meta:{
        title: '关于'
      }
    }, {
      path: '/user/:userId',
      component: User,
      meta:{
        title: '用户'
      }
    }, {
      path: "/profile",
      component: Profile,
      meta:{
        title: '档案'
      }
    }
  ]
//  3. 挂载到Vue实例中
});
// to和from是route对象
router.beforeEach((to,from,next)=>{
  // document.title = to.meta.title;
  let title = to.meta.title;
  if (title)
    document.title = title
  next()
});
router.afterEach((to,from)=>{
  console.log("3----");
});
export default router
