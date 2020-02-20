<template>
    <div>
      <h3> 子组件的counter: {{count}}</h3>
      <h3>store: {{$store.state.counter}}</h3>
      <button @click="add">+</button>&nbsp;&nbsp;<button @click="sub">-</button>
    </div>
</template>

<script>
    export default {
        name: "HelloVuex",
      props:{
          count:Number
      },methods:{
          add(){
            this.$store.commit('increment')
          },sub(){
            this.$store.commit("decrement")
        }
      }
    }
</script>

<style scoped>

</style>
