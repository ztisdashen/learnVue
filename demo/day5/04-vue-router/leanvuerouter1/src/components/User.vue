<template>
    <div>
      <h1 style="align-content: center;color: blanchedalmond">我是user</h1>
      <h2 style="color: brown">用户id：{{userId}}</h2>
      <h3 class="text">用户id：{{$route.params.userId}}</h3>
    </div>
</template>

<script>
    export default {
        name: "User",
      computed:{
          userId(){
            return this.$route.params.userId  // 获取我们配置的router的index.js中的routes的，那个活跃获取那个
          }
      }
    }
</script>

<style scoped>

  .text{
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    background-image: -webkit-linear-gradient(left, #ff0000,#66eeff 10%,#cc11ff 20%, #ff836f 30%, #CCaaFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
    font-size: 35px;
  }
</style>
