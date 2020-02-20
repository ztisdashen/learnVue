# day4 Vue.js

## 组件化开发

### watch

> 监听某一个属性的改变

### 父子组件访问 $children

1. 父子组件相互直接访问
   1. 父组件访问子组件 $Children / $ refs **使用$refs时必须在组件上加入refs属性**
   2. 子组件访问父组件 $parent / $root

2. $children

   1. this.$children是一个数组类型，包含所有子组件类型

      

      

### 父访问子

```html
      <template id="apk">
          <div>我是子组件</div>
      </template>
      
      <body>
      <div id="app">
          <button @click="btnClick">button</button>
          <sp1></sp1>
          <sp1 ref="aaa"></sp1>
          <sp1></sp1>
      </div>
      <script>
          new Vue({
              el:'#app',
              methods: {
                btnClick(){
                    this.$children[0].showMsg();
                    this.$children[0].name;
                    console.log("-----------------");
                    console.log(this.$refs.aaa)
                }
              },
              components:{
                  sp1:{
                      template:`#apk`,
                      data(){
                          return {name:'我是子组件'}
                      },
                      methods:{
                          showMsg(){
                              console.log('msg');
                          }
                      }
                  }
              }
          })
      </script>
```

​      

   ### 插槽 SLOT

> 组件的插槽使组件具有更好的扩展性

**基本使用**

```html
<template id="apk">
    <div>
        <h2>slot</h2>
        <slot><h3>插槽中的默认值</h3></slot>
    </div>
</template>

<body>
<div id="app">
    <sp1><button>案例</button></sp1>
    <sp1><h2>案例</h2></sp1>
    <sp1><hr></sp1>
    <sp1/>
</div>

<script>
    new Vue({
        el:'#app',
        methods: {
        },
        components:{
            sp1:{
                template:`#apk`,
            }
        }
    })
</script>
```

#### 具名插槽

> 当含有多个插槽时选择哪一个插入
>
> 默认插入到没有名字属性的插槽中

```html
<template id="apk">
    <div>
        <h2>slot</h2>
        <slot name="slot1"><h3>插槽 1</h3></slot>
        <slot name="slot2"><h3>插槽 2</h3></slot>
        <slot name="slot3"><h3>插槽 3</h3></slot>
        <slot><h3>没有名字的插槽</h3></slot>
    </div>
</template>

<body>
<div id="app">
    <sp1><button slot="slot1">案例</button></sp1>
    <sp1><h2 slot="slot2">案例</h2></sp1>
    <sp1><hr slot="slot3"></sp1>
    <sp1/>
</div>

<script>
    new Vue({
        el:'#app',
        methods: {
        },
        components:{
            sp1:{
                template:`#apk`,
            }
        }
    })
</script>
```

#### 编译作用域

#### 作用域插槽

> 将子组件的数据传递到父组件中使用

```html
<template id="apk">
    <div>
        <h2>作用域插槽</h2>
        <slot :data="pl">
            <ul>
                <li v-for="i in pl">{{i}}</li>
            </ul>
        </slot>

    </div>
</template>

<body>
<div id="app">
    <sp1>
        <template slot-scope="slot">
            <span v-for="i in slot.data">{{i+"-"}}</span>
        </template>
    </sp1>
    <sp1></sp1>
</div>

<script>
    new Vue({
        el:'#app',
        data:{
        },
        components:{
            sp1:{
                template:`#apk`,
                data(){
                    return {pl:['Java','Swift','Python','Go','C++','R']}
                }
            }
        }
    })
</script>
```

## 前端模块化



## WebPack

### 认识webpack

> js静态模块化打包工具

1. npm =>node package manage
2. 全局安装webpack 3.6 因为vue cli2.X依赖此版本 `npm install webpack@3.6.0 -g`
3. 局部安装
   1. `npm install webpack@3.6.0 --save-dev`

#### 配置

> `npm init`初始化信息
>
> `webpack`命令

### webpack的安装

### loader

> 处理css,vue等文件,将ES6变成ES5等

**不同文件有不同的loader**

#### css

> 我们需要像打包js一样打包css,需要在main.js中`require("./css/normal.css");`

> **安装**: `npm install --save-dev css-loader` 

```javascript
//在webpack.config.js
module:{
        rules:[
            {
                test:/\.css$/,
                use:['css-loader']
            }
        ]
    }
```

**但是真正使css样式起作用还需要安装style-loader   `npm install style-loader --save-dev `** 

在use中添加style-loader



## Vue Cli

