<template>
  <div id="app">
    <!--    <img src="./assets/logo.png">-->
    <button @click="btnHome">btn-home</button>
    <button @click="btnUser">btn-user</button>
    <button @click="btnProfile">btn-profile</button>
    <button @click="btnAbout">btn-about</button>
    <br>
    <router-link to="/home" active-class="active" replace>home</router-link>
    <router-link to="/about" tag="button">about</router-link>
    <router-link v-bind:to="'/user/'+userId">我的</router-link>
    <router-link :to="{path:'/profile',query:{name:'haha',age:18}}">profile</router-link>
    <keep-alive exclude="Profile">
      <router-view/>
    </keep-alive>

    <!--    <router-view/>  决定跳转的页面出现在哪里-->
    <button @click="btnShowRouter" n>show router</button>
    <button @click="btnShowRoute">show route</button>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {userId: 15}
    },
    methods: {
      btnAbout() {
        this.$router.push("/about")
      }, btnHome() {
        this.$router.push("/home")
      }, btnUser() {
        this.$router.push("/user/" + this.userId)
      }, btnProfile() {
        const data = {path: "/profile", query: {name: 'haha', age: 18}}
        this.$router.push(data)
      },btnShowRouter(){
        console.log(this.$router)
      },btnShowRoute(){
      console.log(this.$route)
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

  .router-link-active {
    color: aqua;
  }

  .active {
    color: aquamarine;
  }
</style>
