import Vue from 'vue'
import vueResource from 'vue-resource' 
import App from './App.vue' //引入自定义组件
//声明使用vue的插件
Vue.use(vueResource) //内部给所有的组件对象身上都挂了一个$http
new Vue({
    el:'#root',
     //在Vue创建之前，挂载一个全局事件总线
     beforeCreate (){
        Vue.prototype.$eventBus = this
      },
    components:{
        App
    },
    template:'<App/>'
})