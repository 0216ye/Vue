<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- <Header :todoAdd= "todoAdd" /> -->
      <!-- <Header @todoAdd = "todoAdd" /> 给当前的组件对象Header绑定自定义事件 -->
      <Header ref = "header" /> <!--通过ref绑定事件,可以在当前App组件中通过on-->
      <List :todos="todos"   />
      <Footer>
        <!--插槽slot：传递对应子组件中slot的name属性的标签数据给子组件-->
        <label slot="left">
          <input type="checkbox" v-model="isCheckAll" />
        </label>
        <span slot = "middle">
          <span>已完成{{isShowSize}}</span>
          / 全部{{todos.length}}
        </span>
        <button slot="right"  class="btn btn-danger" v-show="isShowSize>0" @click="clearIsShow">清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
import PubSub from 'pubsub-js'
export default {
  data() {
    return {
      todos: [
        // //数据的类型
        // { id: 1, title: "A", isShow: true },
        // { id: 2, title: "B", isShow: true },
        // { id: 3, title: "C", isShow: false },
      ],
    };
  },
  computed: {
    //计算属性->用于判断已经选中的数量
    isShowSize() {
      //只需要知道由多少已经是选中的状态 -->getter
      //reduce(回调，初始值) -->回调的第一个参数为初始值的值，
      //reduce-->可以用与计算数组的数据
      return this.todos.reduce(
        (pretotal, todo, index) => pretotal + (todo.isShow ? 1 : 0),
        0
      );
    },
    //计算属性->用于判断是否全部已经选中
    isCheckAll: {
      get() {
        //调用计算属性，不需要像函数一样加上(),计算属性在初始化显示和读取数据和会自动调用get
        return this.todos.length === this.isShowSize && this.todos.length>0;
      },
      set(value){ //监视是否选中
        this.CheckAll(value)
      }
    },
  },
  components: {
    //注册组件
    Header,
    List,
    Footer,
  },
  //页面挂载后
  mounted(){
    //消息订阅
    PubSub.subscribe('upDate',(msg,{todo,isShow})=>{
      this.upDate(todo,isShow)
    })
    
    //从localStorage中读取
    this.todos = JSON.parse(localStorage.getItem('todos_key') || '[]') 

    //提供ref和$on为Header组件绑定事件, 参数一为事件名称，参数二为指定的回调
    this.$refs.header.$on('todoAdd',this.todoAdd)

    //绑定事件的监听-->通过全局事件总线
    this.$globalEventBus.$on('todoDelete',this.todoDelete)
  },
  //在组件被销毁前，移除自定义事件
  beforeDestroy(){
    this.$refs.header.$off('todoAdd'),
    this.$globalEventBus.$off('todoDelete')
  },
  //监视属性
  watch:{
    todos:{
      deep:true, //深度监视
      handler(value){ // value 为最新的todos的数据
        localStorage.setItem('todos_key',JSON.stringify(value))
      }
    }
  },
  methods: {
    //用于向保存数据的todos添加一条数据-->传递给子组件，供其能够修改data中的数据
    todoAdd(todo) {
      this.todos.unshift(todo);
    },
    //用于删除一条数据
    todoDelete(index) {
      this.todos.splice(index,1)
    },
    //删除已经选中的Item
    clearIsShow(){
      //filter会将结果为true的每项返回，并且filter是返回一个新的数组
      this.todos = this.todos.filter(item => !item.isShow)
    },
    //改变全部是否选中
    CheckAll(isShow){
      this.todos.forEach(item =>{
        item.isShow = isShow
      })
    },
    //用于子组件更新Item 的选中状态
    upDate(todo,isShow){
      todo.isShow = isShow
    }
  },
};
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
