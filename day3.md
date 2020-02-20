# day3 Vue.js
## 高阶函数
```javascript
        num.filter(function (n) {
            return n < 20
        });
        let newNum = num.map(function (n) {
            return n * 2;
        });
        newNum.reduce((oldVal,newVal)=>{
           return oldVal + newVal 
        });
        num.filter(n => n<20).map(n => n * 2).reduce((o,n)=> o+n)
```
## v-model
### 基本使用和实现
```html

<div id="app">
    <input type="text" v-model="msg"><br>
    {{msg}}
    <br>
    <input type="text" :value="msg" @input="msgChange($event)">
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            msg:"1212"
        },methods:{
            msgChange(event){
                this.msg = event.target.value

            }
        }
    })
</script>
```
## radio
## checkbox
```html
<div id="app">
    同意协议:
    <input type="checkbox" v-model="checked">,
    爱好：篮球<input type="checkbox" v-model="hobby[0]">,
        足球<input type="checkbox" v-model="hobby[1]">,
        乒乓球<input type="checkbox" v-model="hobby[2]">,
        棒球<input type="checkbox" v-model="hobby[3]">
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            checked:true,
            hobby:[true,true,true,true]
        },methods:{

        }
    })
</script>
```
### select
```html
<div id="app">
    <select name="fruit" v-model="fruit">
        <option value="苹果" >苹果</option>
        <option value="草莓">草莓</option>
        <option value="香蕉">香蕉</option>
        <option value="菠萝">菠萝</option>
    </select>
    <h2>{{fruit}}</h2>
    <select name="fruit" v-model="fruits" multiple>
        <option value="苹果" >苹果</option>
        <option value="草莓">草莓</option>
        <option value="香蕉">香蕉</option>
        <option value="菠萝">菠萝</option>
    </select>
    <h2>{{fruits}}</h2>
</div>
<script>
    new Vue({
        el:"#app",
        data:{
            fruit:"苹果",
            fruits:[]
        },methods:{

        }
    })
</script>
```
## 修饰符
### lazy
> v-model实时绑定，使用lazy则会达到某种条件才会改变
> 失去焦点或者回车时才会改变
> v-model.lazy=""
### number
> number 只能输入数字
### trim
> 去除空格
## 组件化开发（使用div包裹）
1. 组件化开发的步骤
    1. 创建组件构造器
    2. 注册组件
    3. 使用组件
```flow
op=>operation: 调用Vue.extend()方法创建组件构造器
op1=>operation: 调用Vue.component()方法组测组件
op2=>operation: 在vue实例范围内使用组件
op->op1->op2
```

2. `Vue.extends`
   1. 创建组件构造器
   2. 传入template代表我们自定义的组件模板
3. `Vue.component`
   1. 参数自定义标签名 传入组件

### 全局组件和局部组件

1. 全局组件意味着可以在多个Vue实例下使用
2. 局部组件

```javascript
// 1. 创建组件构造器
    const cpn = Vue.extend({
        template: `<div><h2>哈哈</h2> <p>how are you</p> <p>i'm fine Thank you</p><hr></div>`
    });
    // 2. 注册组件
    Vue.component("my-cpn", cpn);
    // 3. 使用组件
    new Vue({
        el: "#app",
    });
    new Vue({
        el: "#app2",
        component:{
            ckk:cpn
        }

    })
```

### 父子组件 

```javascript
const cpn1 = Vue.extend({
        // language=HTML
        template: `
        <div>
            <h2>hello Vue.js 1</h2>
        </div>`
    });
    const cpn2 = Vue.extend({
        // language=HTML
        template: `
        <div>
            <h2>hello Vue.js 2</h2>
            <hr>
            <my_cp></my_cp>
        </div>`,
        components:{
            my_cp:cpn1
        }
    });
    new Vue({
        el: "#app",
        data: {
            msg: "1212"
        },
        components:{
            cp1:cpn1,
            cp2:cpn2
        }
    })
```

### 组件的语法糖

1. 将`Vue.extend()`中的内容直接放到`Vue.component`中

```javascript
Vue.conponent("cp1",{
    template:`<div>hello world</div>`
})
new Vue({
    conponents:{
        cp1:`<div>he he</div>`
    }
})
```

### 组件模板的分离写法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="../../node_modules/vue/dist/vue.js">
    </script>
    <script type="text/x-template" id="cp1">
    <div>
        <h2>hello world</h2>
    </div>
</script>
</head>
<body>
<template id="cp23">
    <h2>template</h2>
</template>
<div id="app">
    <cp1></cp1>
    <cp2></cp2>
</div>
<script>
    const cpn1 = Vue.extend({
        // language=HTML
        template: "#cp1"
    });
    const c = Vue.component("cp2",{
        template:"#cp23"
    });
    new Vue({
        el: "#app",
        data: {
            msg: "1212"
        },
        components:{
            cp1:cpn1,
        }
    })
</script>
</body>
</html>
```

### 组件能否访问Vue实例数据

> data是个函数不是实例 

```javascript
Vue.component("s",{
    template:"<>",
    components:{},
    data(){
        return {title:'absssd'}
    }
})
```

### 为什么组件中数据时方法而不是对象

> 避免多个标签使用相同的数据

### 父子组件传递消息

1. 通过**`props`**向子组件传递数据
2. 通过事件向父组件发送消息

```html
<body>
<template id="cp23">
    <div>
        <h2>template</h2>
        <ul>
            <li v-for="i in cmovies">{{i}}</li>
        </ul>
        <h1>{{chichi}}</h1>
    </div>

</template>
<div id="app">
<cp1 v-bind:cmovies="msg" :chichi="m"></cp1>
</div>
<script>

    new Vue({
        el: "#app",
        data: {
            msg: ['A','B','C','D'],
            m:"hello Vue"
        },
        components:{
            cp1:{
                template:`#cp23`,
                //变量名
                props:['cmovies','chichi']
            },
        }
    })props:{
                    //类型限制
                    // cmovies:Array,
                    // chichi:String
                //    提供默认值
                    chichi:{
                        type:String,
                        default:"default" 
                    },
                    cmovies:{
                        type: Array,
                        default: ['default']
                    }
                }
            }
                
             /**   
                props:{
                    //类型限制
                    // cmovies:Array,
                    // chichi:String
                //    提供默认值
                    chichi:{
                        type:String,
                        default:"default",
                        required:true
                    },
                    // 当时对象或者数组时默认值必须是方法，返回数组或者对象
                    cmovies:{
                        type: Array,
                        default(){
                        	return [];
                        },
                        required:true
                    }
                }
    **/
    
</script>
</body>
```
### 驼峰变量
1. 在定义是可以使用驼峰变量cMovies，但是在使用时必须是c-movies

### 子组件传父组件

> `$emit`触发事件  父组件中定义方法接受事件 **事件名最好全部小写**

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
<template id="cp23">
    <div>
        <h2>template</h2>
        <button v-for="i in c" @click="btnClick(i.id)">{{i.name}}</button>
    </div>

</template>
<div id="app">
    <cp1 @itemclick="cpnClick"></cp1>
</div>
<script>
    const cp = Vue.extend({
        template:`#cp23`,
        data(){
            return {c:[{id:0,name:"A"},{id:1,name:"Ae"},{id:2,name:"Ar"},{id:3,name:"Aw"}]}
        },methods:{
            btnClick(id){
                //$emit(自定义事件名称)
                // console.log("haha")
                this.$emit('itemclick',id)
            }
        }

    });
    new Vue({
        el: "#app",
        data: {
            msg: ['A','B','C','D'],
            m:"hello Vue"
        },
        components:{
            cp1:cp
        },methods:{
            cpnClick(id){
                console.log('event'+" "+id);
            }
        }
    })
</script>
</body>
</html>
```



