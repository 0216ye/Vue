<template>
  <ul class="todo-main">
    <Item  v-for="(todo,index) in todos" :key = "todo.id"  :todo = "todo"  :index = "index" />
  </ul>
</template>

<script type="text/ecmascript-6">
  import Item from './Item'
  export default {
    props:['todos'],  //声明接受的类型， 属性为接受的名，属性值为接受的属性的类型
    components:{
      Item
    },
  
  };
</script>

<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
