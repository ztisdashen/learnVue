<template>
    <div>
        <h2 class="title">{{msg}}</h2>
<br>
        <button @click="btnClick">button</button>
<!--        <<sub/>>-->
        <subb/>
    </div>
</template>

<script>
    import subb from "./sub.vue";
    export default {
        name: "app",
        data(){
            return {msg:'hello vue.js'}
        },methods:{
            btnClick(){
                this.msg = this.msg + "1 "
            }
        },components:{
            subb
        }
    }
</script>

<style scoped>
.title{
    color: aqua;
}
</style>