# vue day1
## v-bind
> 动态绑定属性
### v-bing语法糖
`<img :src="img">`
### v-bind class 对象语法
`<标签名 :class:"{classname:boolean,classname:boolean}">`
```html
<h3 :class="{haha:true,chichi:false}">{{img}}</h3>
```
> 可以和普通class共存
### v-bing class([数组])
### v-bind style(类)
```html
<div id="app">
    <h2 :style="{fontSize:'50px',color:'red'}">123456</h2>
</div>
```
### v-bind style[array]
```html

<div id="app">
    <h2 :style="[s,t]">hello vue</h2>
</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            s: {fontSize: "100px"},
            t: {color: "red"}
        }

    })
</script>
```
## 计算属性
### 基本使用
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../../node_modules/vue/dist/vue.js">


    </script>
</head>
<body>
<div id="app">
    <h2>{{firstName+" "+lastName}}</h2>
    <h2>{{getName()}}</h2>
    <h2>{{fullName}}</h2>
    <!--    <h2 :style="[s,t]">hello vue</h2>-->
</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            firstName:"Tom",
            lastName:"King"
        },
        methods:{
            getName(){
                return this.firstName + " "+ this.lastName
            }
        },
        computed:{
            fullName(){
                return this.firstName + " "+ this.lastName
            }
        }

    })
</script>
</html>
```
### 深入使用
```html

<div id="app">
<h2>total price:{{totalPrice}}</h2>
</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            books:[
                {id:1,name:"A",price:100},
                {id:3,name:"A",price:110},
                {id:5,name:"A",price:120},
                {id:2,name:"A",price:105},
            ]
        },
        computed:{
            totalPrice(){
                let t = 0;
                for (let i=0;i<this.books.length;i++){
                    t +=this.books[i].price
                }
                return t
            }
        }

    })
</script>
```
