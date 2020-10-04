import Vue from 'vue'
import App from './App.vue' //引入自定义组件
import router from './router'
//声明使用vue的插件
new Vue({
    el:'#root',
   
    components:{
        App
    },
    //注册路由器
    router:router,
    template:'<App/>'
})