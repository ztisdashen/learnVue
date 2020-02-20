<template>
    <div>
      <h2>i am profile</h2>
      <h3>{{$route.query.name}}</h3>
      <h3>{{$route.query.age}}</h3>
    </div>
</template>

<script>
    export default {
        name: "Profile",
      created() {
        console.log("profile create")
      },destroyed() {
        console.log("profile destroy")
      }
    }
</script>

<style scoped>

</style>
