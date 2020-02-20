# day7 Vue.js

[TOC]



## ES6中的Promise  p124

**在webpack**的配置文件中存在别名配置用@代表src，来取代../../的写法

![](\img\TIM截图20200202154857.jpg)

在html标签内部存在某些属性存在索引使用 **~**

### what

1. promise是异步编程的解决方案
2. 一般是处理网络请求
   1. 在发出网络请求后，程序不会暂停运行
   2. 得到结果后自动执行回调函数

### 网络请求的回调地狱

回调函数中还存在回调函数

使用定时器模拟进行异步操作

```javascript
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("第一层");
            console.log("第一层");
            console.log("第一层");
            console.log("第一层");
            setTimeout(()=>{
                console.log("second");
                console.log("second");
                console.log("second");
                console.log("second");
            },1000)
        }, 2000)
    });
    new Promise(((resolve, reject) => {
        setTimeout((data)=>{
            resolve(data);
            // 处理错误信息
            reject("err msg")
        },1000)
    })).then((data)=>{
        console.log("第一层");
        console.log("第一层");
        console.log("第一层");
        console.log("第一层");
        return new Promise(((resolve, reject) => {
            setTimeout(()=>{
                resolve()
            })
        })).then(()=>{
            console.log("second");
            console.log("second");
            console.log("second");
            console.log("second");
        })
    }).catch(onerror=>{
        console.log(onerror)
    })
```

### promise三种状态

* pending 等待
* fullfill 满足
* reject  拒绝

### 另一种写法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    new Promise(((resolve, reject) => {
        resolve("hello promise");
        reject("err msg")
    })).then(data=>{
        console.log(data)
    },err=>{
        console.log(err)
    })
</script>
</body>
</html>
```

### promis的all

我们希望回调函数在两个ajax全回后进行，

```javascript
    Promise.all([new Promise(((resolve, reject) => {
        setTimeout(()=>{
            resolve({name:"why"})
        },1000)
    })),new Promise(((resolve, reject) => {
        setTimeout(()=>{
            resolve({name:"haha"})
        },1000)
    }))]).then(results=>{
        console.log(results[0]);
        console.log(results[1])
    })
```

## VueX

> 组件状态管理工具
>
> 将多个组件的共享变量放在同一个对象上

### 从单界面到多界面

`npm install vuex --save`

* 使用

  ```javascript
  import Vue from "vue";
  import Vuex from 'vuex'
  // 安装vuex
  Vue.use(Vuex);
  // 创建Vuex对象
  const store = new Vuex.Store({
    state:{
      counter:1000
    },
    mutations:{},
    actions:{},
    getters:{},
    modules:{}
  });
  export default store
  
  ```

* 挂载到vue实例上

#### state修改

**通过mutation进行同步修改**

在实例中注册方法

```json
  mutations:{
    // 方法 存在默认参数state
    increment(state){
      state.counter ++;
    },decrement(state){
      state.counter --;
    }
  }
```

在组件中提交

```javascript
          add(){
            this.$store.commit('increment')
          },sub(){
            this.$store.commit("decrement")
        }
```

### vues几个核心概念

1.   state
2.   mutations
3.   actions
4.   getters
5.   modules

#### state

* 保存共享数据
* **单一状态树**
  * 把所有的共享信息放在一个store对象中，而不是多个store对象，便于维护

#### getters

> 类似于计算属性

```json
getters:{
  dollar(state){
    return state.counter + "$"
  }
}
```

```vue
<h3>--------getters使用--------</h3>
<h4>dollar {{$store.getters.dollar}}</h4>
```

##### 参数

```javascript
more20StuLength(state,getters){
  return getters.more20stu.length
}
```

```javascript
moreMyAge(state){
  return function (age) {
    return state.stus.filter(s=>s.age >= age)
  }
```

```vue
<h3>{{$store.getters.more20StuLength}}</h3>
<h3>{{$store.getters.moreMyAge(8)}}</h3>
```

#### mutation状态更新

* 两部分
  * 事件类型
  * 回调函数

```javascript
addCount(state,count){
  state.counter += count
}
```

 **mutation提交 commit**

当写成对象风格时，会变成一个对象，所以需要用payload取出数据

```javascript
addCount(count){
  // this.$store.commit("addCount",count)
  this.$store.commit({type:'addCount',count:count })
}

addCount(state,payload){
      state.counter += payload.count
    }
```

##### mutation的响应性原理

```javascript
updateInfo(state){  // 之前没有这些属性
      //state.info['address'] = "LA"; // 不是响应性的
      // Vue.set(state.info,'address','LA')  // 响应性的
      Vue.delete(state.info,"age")
    }
```

##### mutation的类型常量

```
import {INCREMENT} from "../mutation-types";
[INCREMENT](state){
      state.counter ++;
    }
```

#### action

* 在mutation中不适合进行异步操作

```javascript
updateInfo(state){
      //state.info['address'] = "LA"; // 不是响应性的
      // Vue.set(state.info,'address','LA')  // 响应性的
      // Vue.delete(state.info,"age")
      setTimeout(()=>{
        state.info.name="zt"
      },1000)
    } // 数据虽然更新，在vue dev tool中无法跟踪
```

* 因此需要在action中进行异步操作
  * **修改state只能通过mutation进行修改，不能再action中直接`context.state.info.name =xxx`**

```
updateInfo(){
  this.$store.dispatch("aUpdateInfo")  // 处理action
  // this.$store.commit("updateInfo")  // 处理mutation
}
```

```javascript
actions:{
  aUpdateInfo(context){
    setTimeout(()=>{
      context.commit('updateInfo')
    },1000)
  }
}
```

> 另一种写法

```javascript
aUpdateInfo(context,payload){
  return new Promise(resolve => {
    setTimeout(()=>{
      context.commit('updateInfo');
      payload.success();
      payload.msg
      resolve("promise")
    },1000)
  })
```

```javascript
updateInfo(){
  // this.$store.dispatch("aUpdateInfo",{
  //   msg:"i am finish",
  //   success:()=>console.log("success ha ha")
  // })
  // this.$store.commit("updateInfo")
  this.$store.dispatch("aUpdateInfo",{
    msg:"i am finish",
    success:()=>console.log("success ha ha")
  }).then(data=>{console.log(data)})
}
```

#### modules

> 将一个store分模块类似于子组件

##### state

```Vue
<h1>------------------------module------------------------</h1>
<h3>{{$store.state.moduleA.name}}</h3>
<button @click="updateAName">updateAName</button>
```

##### mutation

```
updateAName(){  // 名字不能与父vuex的mutation重复
  this.$store.commit("updateAName","hahahahaha")
```

##### getter

```vue
<h3>getter {{$store.getters.fullName}}</h3>
```

> 同理 getter名字不能重复

**context对象**

![](\img\TIM截图20200203202254.jpg)