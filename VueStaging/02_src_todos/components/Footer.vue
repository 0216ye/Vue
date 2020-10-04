<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{isShowSize}}</span>
      / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" v-show="isShowSize>0" @click="clearIsShow">清除已完成任务</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["todos", "clearIsShow", "CheckAll"],
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
};
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
