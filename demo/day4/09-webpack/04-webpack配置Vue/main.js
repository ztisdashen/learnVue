// 1.以来css
// 2. 依赖less
// 3. 依赖Vue
require("./css/normal.css");
require("./css/demo.less");
import Vue from 'vue'
document.writeln("<h2>hello Vue</h2>");
// const a = 15;
// let b = 15;
// console.log(a+b);
// import app from './vue/app'
// const app = {
//     template:`
//         <div>
//             {{msg}}<br>
//             <button @click="btnClick">button</button>
//         </div>
//     `,
//     data(){
//         return {msg:'hello vue.js'}
//     },methods:{
//         btnClick(){
//             this.msg = this.msg + "1 "
//         }
//     }
// };
import app from './vue/app.vue'
new Vue({
    el: `#app`,
    template:`<app/>`,
    data:{
        // msg:'hello vue.js'
    },methods:{
        btnClick(){
            this.msg = this.msg + "1 "
        }
    },components:{
        app:app
    }
});