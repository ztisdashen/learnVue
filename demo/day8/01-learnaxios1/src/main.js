import Vue from 'vue'
import App from './App'
// http://123.207.32.32:8000/home/multidata
import axios from "axios"
// axios({
//   url:'http://localhost:8888/test/demo',
//   method:'get'
// }).then(res=>{
//   console.log(res)
//   // Vue.$root.$refs[0].data = res.data
// });
// axios({
//   method: "get",
//   url:"http://localhost:8888/test/dpage",
//   params:{
//     page:1
//   }
// }).then(res=>{
//   console.log(res)
//   // Vue.$root.$refs[0].data = res.data
// });


// 2. axios的并发请求
// axios.all([axios({
//   url:"http://123.207.32.32:8000/home/multidata"
// }),axios({
//   url: "http://123.207.32.32:8000/home/data",
//   params:{
//     type:'sell',
//     page:1
//   }
// })]).then(res=>{
//   console.log(res)});
// axios.defaults.baseURL = "http://123.207.32.32:8000";
// axios.defaults.timeout = 5000;
// axios.all([axios({
//   url:"/home/multidata"
// }),axios({
//   url: "/home/data",
//   params:{
//     type:'sell',
//     page:1
//   }
// })]).then(axios.spread((res1,res2)=>{
//   console.log(res1)
//   console.log("--------------")
//   console.log(res2)
// }));
// const instance1 = axios.create({
//   baseURL:"http://123.207.32.32:8000",
//   timeout:5000
// });
// instance1({
//   url:"/home/multidata"
// }).then(res=>{
//   console.log(res)
// });
import {instances} from "../src/network/request"
instances({url:'/home/multidata'}).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err)
});
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),

})

