<template>
  <div id="app">
    <h2 style="color: #42b983">{{msg}}</h2>
    <h3>{{count}}</h3>
    <button @click="countClick">+</button>
    <br>
    <hello-vuex :count="count"/>
    <h3>store: {{$store.state.counter}}</h3>
    <h3>--------getters使用--------</h3>
    <h4>dollar {{$store.getters.dollar}}</h4>
    <h2> {{ more20stu }}</h2>
    <h2> {{$store.getters.more20stu}}</h2>
    <h3>{{$store.getters.more20StuLength}}</h3>
    <h3>{{$store.getters.moreMyAge(8)}}</h3>
    <h2>-----mutation-----</h2>
    <button @click="addCount(5)">+5</button>
    <h3>------响应性原理-------</h3>
    <button @click="updateInfo">更新信息</button>
    <h3>{{$store.state.info}}</h3>
    <input type="text" v-model="$store.state.info.name">
    <h1>------------------------module------------------------</h1>
    <h3>{{$store.state.moduleA.name}}</h3>
    <button @click="updateAName">updateAName</button>
    <h3>getter {{$store.getters.fullName}}</h3>
    <h3>getter {{$store.getters.fullName2}}</h3>
    <h3>getter {{$store.getters.fullName3}}</h3>
    <button @click="aUpdateAName">异步修改名字</button>
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex";

export default {
  name: 'App',
  data(){
    return {msg:"hello vuex",count:0}
  },methods:{
    countClick(){
      this.count++;
    },addCount(count){
      // this.$store.commit("addCount",count)
      this.$store.commit({type:'addCount',count:count })
    },updateInfo(){
      // this.$store.dispatch("aUpdateInfo",{
      //   msg:"i am finish",
      //   success:()=>console.log("success ha ha")
      // })
      // this.$store.commit("updateInfo")
      this.$store.dispatch("aUpdateInfo",{
        msg:"i am finish",
        success:()=>console.log("success ha ha")
      }).then(data=>{console.log(data)})
    },updateAName(){
      this.$store.commit("updateAName","hahahahaha")
    },aUpdateAName(){
      this.$store.dispatch('aUpdate')
    }
  },components:{
    HelloVuex
  },computed:{
    more20stu(){
      return this.$store.state.stus.filter(s=> s.age > 20)
    }
  }
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
