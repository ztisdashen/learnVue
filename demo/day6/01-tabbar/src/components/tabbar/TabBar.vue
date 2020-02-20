<template>
<div id="tab-bar">

  <slot/>
</div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar {
    /*水平布局*/
    display: flex;
    background: #f6f6f6;
    /*在下部分*/
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    /*  小阴影 x,y,模糊程度，颜色*/
    box-shadow: 0px -10px 10px #f6f6f6;
  }

</style>
