<template>
  <div id="app">
    <router-view/>
    <tab-bar>
      <tab-bar-item :path="'/home'">
        <img slot="img" src="../src/assets/img/1.png">
        <img slot="img_a" src="../src/assets/img/1_a.jpg">
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item :path="'/category'"><img slot="img" src="../src/assets/img/2.jpg">
        <img slot="img_a" src="../src/assets/img/2_a.jpg">
        <div slot="text">分类</div>
      </tab-bar-item>
      <tab-bar-item :path="'/cart'"><img slot="img" src="../src/assets/img/3.jpg">
        <img slot="img_a" src="../src/assets/img/3_a.jpg">
        <div slot="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item :path="'/me'"><img slot="img" src="../src/assets/img/4.jpg">
        <img slot="img_a" src="../src/assets/img/4_a.jpg">
        <div slot="text">我的</div>
      </tab-bar-item>
    </tab-bar>


  </div>
</template>

<script>
  import TabBar from "./components/tabbar/TabBar";
  import TabBarItem from "./components/tabbar/TabBarItem";

  export default {
    name: 'App',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>
  @import "assets/css/base.css";


</style>
