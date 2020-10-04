<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认"  v-model="Info" @keyup.enter="add" />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      todoAdd:{
        type:Function,
      }
    },
    data(){
      return {
        Info:''
      }
    },
    methods:{
      add(){
        //输入框为空，不能添加
        if (!this.Info){
          alert('内容不能为空')
          return
        }
        //1获取输入框输入的title
       const todo =  {
         id:Date.now(),
         title:this.Info.trim(),
         isShow:false
       }
        //2将获取到的title添加到父组件的data中-->data数据在哪个组件中创建，修改data的方法也对应的声明在哪个组件中
        // this.todoAdd(todo)
        //分发自定义事件:todoAdd
        this.$emit('todoAdd',todo)
        //3清空输入框的内容
        this.Info = ''  
      }
    }
  };
</script>

<style scoped>
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
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
