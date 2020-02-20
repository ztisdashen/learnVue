import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import("../view/main/Main");
const Category = () => import("../view/category/Category");
const Cart = () => import("../view/cart/Cart");
const Me = () => import("../view/me/Me");
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: "",
      redirect: "/home",
      meta:{
        title:"首页"
      }
    },
    {
      path: "/home",
      component: Home,
      meta:{
        title:"首页"
      }
    },
    {
      path: "/category",
      component: Category,
      meta:{
        title:"分类"
      }
    },
    {
      path: "/cart",
      component: Cart,
      meta:{
        title:"购物车"
      }
    },
    {
      path: "/me",
      component: Me,
      meta:{
        title:"我的"
      }
    },
  ]
})
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  next()
})
export default router
