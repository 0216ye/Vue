<template>
  <li
    :style="{background:bgcolor}"
    @mouseenter="handleEnter(true)"
    @mouseleave="handleEnter(false)"
  >
    <label>
      <input type="checkbox" v-model="isCheck" />
      <!--用于显示是否选中 计算属性-->
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isFalse" @click="deleteItme">删除</button>
  </li>
</template>

<script type="text/ecmascript-6">
import PubSub from 'pubsub-js'
  export default {
    props:{  //声明属性的属性名和属性值的类型
      todo:{
        type:Object,
      },
      index:{
        type:Number
      }
    },
    data(){
      return {
        bgcolor:'white',
        isFalse:false
      }
    },
    computed:{
      isCheck:{
       get(){
        return this.todo.isShow
       },
       set(value){
         //消息发布
         PubSub.publish('upDate',{todo:this.todo,isShow:value})
        //  this.upDate(this.todo,value)
       }
      }
    },
    methods:{
      //用于控制移入移出
      handleEnter(isEnter){
        if (isEnter){
          this.bgcolor = '#666666'
          this.isFalse = true
        }else{
          this.bgcolor = 'white'
          this.isFalse = false
        }
      },

      //用于控制删除一个Itme
      deleteItme(){
        if(confirm('确定删除?')){
          //分发一个自定义事件-->参数一为事件名，参数二为绑定事件指定回调需要的传递的实参
          this.$globalEventBus.$emit('todoDelete',this.index)
          // this.todoDelete(this.index)
        }
      }

    }
  };
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
