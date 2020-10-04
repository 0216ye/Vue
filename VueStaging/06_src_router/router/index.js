
import Vue from 'vue'
import VueRouter from 'vue-router'

 //声明使用Vue的插件
Vue.use(VueRouter)

//解决重复路由跳转导致的报错
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//修改原型对象中的push方法
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
  }
import About from  '../pages/about.vue'
import Home from  '../pages/home.vue'
import News from '../pages/news.vue'
import Message from '../pages/message.vue'
import MessageDetile from '../pages/messageDetile.vue'
//创建路由器的构建函数
export default new VueRouter({
    mode: 'history',
    //配置路由
    routes:[
        // 当前显示的路由组件
        {
            path:'/about',
            component: About
        },
        {
            path:'/home',
            component: Home,
            children:[ //Home的子路由
                {
                    path:'/home/news',
                    component: News 
                },
                {
                    path:'message', //相对路径-> 相当于/home/message
                    component: Message ,
                    children:[
                        {
                            path:'/home/message/detile/:id', // params参数-->动态路由
                            component: MessageDetile,
                            props:true
                        }
                    ]
                },
                  {//重定向:自动跳转
                    path:'',
                    redirect: '/home/news'
                  },  
            ]
        },
        {//重定向:自动跳转
            path:'/',
            redirect: '/about'
        },
    ]
})