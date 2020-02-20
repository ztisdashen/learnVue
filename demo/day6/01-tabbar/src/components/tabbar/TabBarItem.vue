<template>
  <div class="tab-bar-item" @click="btnClick">
    <slot v-if="isActive" name="img"/>
    <slot v-else name="img_a"/>
    <div :class="{active:!isActive}">
      <slot name="text"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem", props: {path: String},
    data() {
      return {}
    }, methods: {
      btnClick() {
        this.isActive = !this.isActive;
        this.$router.replace(this.path)
      }
    },computed:{
      isActive(){
        return !(this.$route.path === this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    /*间距*/
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 12px;
  }

  .tab-bar-item img {
    height: 24px;
    weight: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
  }

  .active {
    color: red;
  }
</style>
