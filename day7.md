# day7 Vue.js

## vue router

### vue router动态路由的使用

* 在某些形况下，路径是不唯一的例如/user/aaa,/user/bbb，前面是user，后面是user的id
* 这种是path和component的匹配关系

```json
    path:'/user/:userId',  //使用时必须在router-link的to属性后值为 /user/+任意值
      component: User
    }
```

```vue
    <router-link v-bind:to="'/user/'+userId">我的</router-link>
<script>
export default {
  name: 'App',
  data(){
    return {userId:15}
  }
}
</script>
```

**通过router**获取某些属性，例如我们希望在user.vue中获得userId  我们这里用的是**route不是router**

```vue
<template>
    <div>
      <h1 style="align-content: center;color: blanchedalmond">我是user</h1>
      <h2 style="color: brown">用户id：{{userId}}</h2>
    </div>
</template>

<script>
    export default {
        name: "User",
      computed:{
          userId(){
            return this.$route.params.userId  // 获取我们配置的router目录的index.js中的routes的，那个活跃获取那个
          }
      }
    }
</script>
```

### 路由的懒加载

> 将项目build后产生的dist文件夹，其中根据不同的文件打包成多个不同文件夹

* 懒加载

  * 打包后，产生的js文件会非常大
  * 将不同的路由的代码分割成不同的代码块，只有被访问是才被加载

* 懒加载写法：

  ```javascript
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
  const User = ()=>import("../components/User");  // 懒加载写法
  const About = ()=>import("../components/About");
  const Home = ()=>import("../components/Home");
  const Home = ()=>
  const router = new VueRouter({
    mode:'history',
    // 配置路由与组件之间的关系
    routes:[{
      path:'',
      // component: Home,
      redirect:'/home'
    },
      {
        path:"/home",
        component:Home
  
      },{
      path: "/about",
        component: About
      },{
      path:'/user/:userId',
        component: User
      }
    ]
  //  3. 挂载到Vue实例中
  });
  export default router
  
  ```

  **在打包后的dist/js中根据打包的路由会产生多个js****

  

  ### 嵌套路由

  ```json
  {
        path:"/home",
        component:Home,
        children:[{
          path:'',
          redirect: 'news'   //默认路径
        },{
          path: 'news', // 不加 ‘/’
          component: News
        },{
          path: 'msg',
          component: Msg
        }]
  
      }
  ```

  ### vue-router传递参数

  * 准备

    * 创建profile.vue
    * 配置路由配置
    * 创建route-link

  * how

    * 动态路由的方式

      * /router/:uid

    * query

      * 配置路由央视 /router
      * 传递方式对象中使用query的key传递
      * 传递后形成路径/router/id=abc

      **index.js**

      ```json
      {
            path: "/profile",
            component: Profile
          }
      ```

      ```vue
      <router-link :to="{path:'/profile',query:{name:'haha',age:18}}">profile</router-link>
      ```

      **profile.vue**

      ```vue
      <template>
          <div>
            <h2>i am profile</h2>
            <h3>{{$route.query.name}}</h3>
            <h3>{{$route.query.age}}</h3>
          </div>
      </template>
      ```

      
      
### 区分`$route` 和 `$router`

$router就是在router目录下index.js定义的router对象，$route就是router对象中routes属性处于活跃状态的那个路由

### 导航守卫

> 对路由的变化进行监听

在router目录下的index.js中route属性中每个添加

```json
{
      path: "/profile",
      component: Profile,
      meta:{
        title: '档案'
      }
    }
```

router的index.js配置

```javascript
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title
  next()
});
```

router.beforeEach() 前置钩子

router.afterEach() 后置钩子 不需要next()

**上面的都是全局守卫**

* 路由独享守卫
* 组件内的守卫



### keep-alive遇见vue-router

每次调用路由其实都是创建新的组件

router-view也是一个组件，如果被包裹在keep-alive中，则路径匹配到的视图组件会被缓存

#### 其他属性

排除某些组件，希望他频繁创建不被缓存  exclude和include 组件名或者正则表达式

```vue
<keep-alive exclude="Profile,User">  //不要加空格
  <router-view/>
</keep-alive>
```

## Demo

