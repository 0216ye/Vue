import Vue from 'vue'
import App from './App.vue' //引入自定义组件

new Vue({
    beforeCreate(){
        Vue.prototype.$globalEventBus = this
    },
    el:'#root',
    components:{
        App
    },
    template:'<App/>'
})