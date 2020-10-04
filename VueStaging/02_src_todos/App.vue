<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :todoAdd= "todoAdd" />
      <List :todos= "todos" :todoDelete = "todoDelete" :upDate = "upDate" />
      <Footer  :todos= "todos" :clearIsShow = "clearIsShow" :CheckAll = "CheckAll"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
export default {
  data() {
    return {
      todos: [
        //数据的类型
        // { id: 1, title: "A", isShow: true },
        // { id: 2, title: "B", isShow: true },
        // { id: 3, title: "C", isShow: false },
      ],
    };
  },
  components: {
    //注册组件
    Header,
    List,
    Footer,
  },
  //页面挂载后
  mounted(){
    //从localStorage中读取
    this.todos = JSON.parse(localStorage.getItem('todos_key') || '[]') 
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
