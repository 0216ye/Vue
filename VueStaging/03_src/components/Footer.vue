<template>
  <div class="todo-footer">
    <!-- <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label> -->
    <slot name="left"/> <!--插槽：类似Props，但可以传递标签数据 -->
    <!-- <span>
      <span>已完成{{isShowSize}}</span>
      / 全部{{todos.length}}
    </span> -->
    <slot name = "middle"/>
    <!-- <button class="btn btn-danger" v-show="isShowSize>0" @click="clearIsShow">清除已完成任务</button> -->
    <slot name = "right" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
 
}
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
