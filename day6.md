# day6 Vue.js

## Vue Cli

### 安装cli错误和ESLint

> 创建cli 2.x

1. `vue init webpack runtimeonly`
   2. runtime    **√**

ESLint会做什么

关掉index.js中的**useESlint**

### runtime-compile和runtime-only

```javascript
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

```javascript
new Vue({
  render: h => h(App),
}).$mount('#app')

```

```flow
op1=>operation: template
op2=>operation: ast
op3=>operation: render
op4=>operation: virsual dom
op1->op2->op3->op4

```

compile会大6kb

render函数是用于创建标签，挂载到#app上

```javascript
new Vue({
    el:"#app",
  	render: function(createEl){
        // return createEl('标签名',{属性},"标签内部的内容")
        return createEl("h2",{class:'active'})
    },
})
// 也可以传入一个组件

```

### Vue cli 3x

1. pick a preset

   - [ ] default

   - [x] manul √ 按空格

     - [ ] >(+) Babel
       > () TypeScript
       > () Progressive Web App (PWA) Support
       > () Router
       > () Vuex
       > () CSS Pre-processors
       > () Linter / Formatter
       > () Unit Testing
       > () E2E Testing  

2. 配置文件

   1. In dedicated config files   √
   2. In package.json  

3. Save this as a preset for future projects  y     **将此作为一个配置模板**

4.  Save preset as:  zt  

![](E:\web\vue\img\TIM截图20200130110045.jpg)

### 自定义配置

* UI配置
  * 启动配置器 `vue ui`

* **vue.config.js**文件自定义配置



### 箭头函数和this

```javascript
const a = ()=>{
    return 15;
}
```

> 箭头函数中的this引用最近作用域中的this



## 路由  vue-router

### 认识路由

* 网络工程的专业术语

### 后端路由

1. 前端渲染

2. 后端渲染
   1. jsp (java server page)/php
   2. 服务器直接返回渲染好的html
   3. 后端处理url和网页的映射关系

### URL的hash

```javascript
location.hash = "aaa" //观察有没有新的资源请求
```

### HTML5的history模式

```javascript
history.pushState({},"","home")
history.replaceState({},"","abo")
history.go(-1)
history.forward()
```

### 认识vue-router

1. 安装vue-router
2. 配饰vue-router
   1. 导入路由对象，并且调入**`Vue.use()`来安装路由功能**
   2. 创建**路由实例**，并且传入路由**映射配置**
   3. 在vue实例中**挂载**创建的**路由实例**

------

```javascript
import VueRouter from "vue-router";

import Vue from "vue";
// import HelloWorld from "@/components/HelloWorld";
// 1. 通过Vue.use()传入插件，安装插件
Vue.use(VueRouter);
// 2. 创建VueRouter对象
import Home from "../components/Home";
import About from "../components/About";
const router = new VueRouter({
  // 配置路由与组件之间的关系
  routes:[
    {
      path:"/home",
      component:Home
    },{
    path: "/about",
      component: About
    }
  ]
//  3. 挂载到Vue实例中
});
export default router


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

3. 使用vue-router

**Home.vue**

```vue
<template>
<!--    </he>-->
  <div>
    <h3>这是home主页</h3>
  </div>

</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
```

**About.vue**

```vue
<template>
    <div>
      <h2>这是About</h2>
    </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>
```

**App.vue**

```vue
<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-link to="/home">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view/>
<!--    <router-view/>  决定跳转的页面出现在哪里-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

**默认选择主页home**

```javascript
const router = new VueRouter({
  // 配置路由与组件之间的关系
  routes:[{
    path:'',
    // component: Home,
      // 重定向
    redirect:'/home'
  },
    {
      path:"/home",
      component:Home
    },{
    path: "/about",
      component: About
    }
  ]
//  3. 挂载到Vue实例中
});
```
> 上面都是通过hash方式，所以地址栏出现#号
------

**history**

```javascript
const router = new VueRouter({
  mode:'history',   // ----------因为在这里
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
    }
  ]
//  3. 挂载到Vue实例中
});
```

### router-link标签

1. to属性，跳转到那个路径
2. 默认渲染成a标签，tag="button"
3. 默认是history.pushState() 添加replace属性，没有值 

### 不通过router-link

```vue
<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <button @click="btnHome">btn-home</button>
    <button @click="btnAbout">btn-about</button><br>
    <router-link to="/home" active-class="active" replace>home</router-link>
    <router-link to="/about" tag="button">about</router-link>
    <router-view/>
<!--    <router-view/>  决定跳转的页面出现在哪里-->
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    btnAbout(){
      this.$router.push("/about")
    },btnHome(){
      this.$router.push("/home")
    }
  }
}
</script>
```

