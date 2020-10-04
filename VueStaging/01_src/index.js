import Vue from 'vue'
import App from './App.vue' //引入自定义组件

new Vue({
    el:'#root',
    components:{ //注册组件
        App:App
    },
    template:'<App></App>'
})