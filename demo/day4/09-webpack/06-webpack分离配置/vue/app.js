export default {
    template:`
        <div>
            {{msg}}<br>
            <button @click="btnClick">button</button>
        </div>        
    `,
    data(){
        return {msg:'hello vue.js'}
    },methods:{
        btnClick(){
            this.msg = this.msg + "1 "
        }
    }
}