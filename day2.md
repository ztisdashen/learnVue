# Vue Day2
## compute
### setter getter
> 计算属性一般是没有set方法
### computed和methods对比
> computed存在缓存机制，如果属性不变则其只会调用一次
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
<!--    <h2>{{// firstName+" "+lastName}}</h2>-->
    <h2>{{getName()}}</h2>
    <h2>{{getName()}}</h2>
    <h2>{{getName()}}</h2>
    <h2>{{getName()}}</h2>
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
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
                console.log("methods")
            }
        },
        computed:{
            fullName(){
                console.log("computed")
                return this.firstName + " "+ this.lastName
            }
        }

    })
</script>
</html>
```
## ES6
### var / let
* var是js设计上的一个缺陷
    *
    * 
## v-on
```html
<div id="app">
    <h2>{{count}}</h2>
    <button @click="count++">+</button>&nbsp;<button @click="count--">-</button>
</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            count: 0
        },
        methods: {
            increment() {
                this.count++;
            },
            decrement() {
                this.count--;
            }
        }


    })
</script>
```
### v-on事件修饰符
* `@click.stop` 阻止事件冒泡
* `@click.prevent`阻止默认事件发生
```html
<div id="app">
<div @click.stop="divClick">
    <button @click.stop="btnClick">button</button>
    <form action="https://www.baidu.com/">
        <input type="submit" value="submit" @click.prevent="submit_">
    </form>
</div>
    <input type="text" @keyup.enter="keyuoda">
</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            count: 0
        },
        methods: {
            divClick(){
                console.log("divclick")},
            btnClick(){
                console.log("btnclick")},
            submit_(){
                console.log("submit")
            },keyuoda(){
                console.log("keyup")
            }
        }

    })
</script>
```
## v-if
```html
<div id="app">
    <h2 v-if="score > 90">hello vue</h2>
    <h2 v-else-if="score>80">hello hh</h2>
    <h2 v-else>huhu</h2>
</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            score:50
        },
        methods: {

        }

    })
</script>
```
## v-show
> 决定一个dom元素是否要显示
> v-show修改属性来决定是否显示，而v-if是通过增删dom元素
## v-for
```html

<div id="app">
<ul>
    <li v-for="(i,index) in p">{{i+" "+index}}</li>
</ul>
</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            p:["A","B","C",'D']
        },


    })
</script>
```
### 组件的key属性
> 便于虚拟dom进行更好的服用dom元素
### 检测更新
> 数据是响应式的
## 案例
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        table,table  td{

            border: 1px solid #000;

        }

        table  td{

            padding: 10px 30px;

        }
    </style>
    <script src="../../node_modules/vue/dist/vue.js">


    </script>
</head>
<body>
<div id="app">
    <div v-if="books.length>0">
        <table style="align-content: center">
            <thead>
            <tr >
                <td></td>
                <td>书籍名称</td>
                <td>出版日期</td>
                <td>价格</td>
                <td>数量</td>
                <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in books">
                <td>{{index}}</td>
                <td>{{item.name}}</td>
                <td>{{item.date}}</td>
                <td>{{item.price|showPrice}}</td>
                <td><button @click="decrement(index)" :disabled="item.count <= 1">-</button>{{item.count}}<button @click="increment(index)">+</button></td>
                <td><button @click="remove(index)">移除</button></td>
            </tr>
            </tbody>
        </table>
        <h2>total:{{totalprice}}</h2>
    </div>
    <div v-else>
        购物车为空
    </div>

</div>

</body>
<script>
    new Vue({
        el: "#app",
        data: {
            books: [
                {id:1,name:"AXC",date:"2019-5",price:120,count:1},
                {id:2,name:"AXCw",date:"2019-1",price:125,count:1},
                {id:3,name:"AXCee",date:"2019-2",price:123,count:1},
                {id:4,name:"AXCsad",date:"2019-3",price:110,count:1}
            ]
        },
        methods:{
            getFinalPrice(price){
                return "￥"+price.toFixed(2)
            },
            decrement(index) {

                this.books[index].count--
            },
            increment(index) {
                this.books[index].count++
            },
            remove(index){
                this.books.splice(index,1)
            }
        },
        filters:{
            showPrice(price){
                return "￥"+price.toFixed(2)
            }
        },computed:{
            totalprice(){
                let total = 0
                for(let i=0;i<this.books.length;i++){
                    total += this.books[i].price *  this.books[i].count
                }
                return total
            }
        }


    })
</script>
</html>
```