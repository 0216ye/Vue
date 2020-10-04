import Vue from 'vue'
import App from './App.vue' //引入自定义组件
import store from './store'
new Vue({
    el:'#root',
   
    components:{
        App
    },
    store,//所有的组件对象都能看见一个指定的store属性：$store
    template:'<App/>'
})