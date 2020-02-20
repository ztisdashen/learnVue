<template>
<!--    </he>-->
  <div>
    <h3>这是home主页</h3>
    <router-link to="/home/news">news</router-link>
    <router-link to="/home/msg">msg</router-link>
    <router-view/>
  </div>

</template>

<script>
    export default {
        name: "Home",
      created() {
        console.log('create')
        document.title = "首页"
      },
      updated() {
        console.log('update')
      },mounted() {
        console.log('mount')
      }
    }
</script>

<style scoped>

</style>
