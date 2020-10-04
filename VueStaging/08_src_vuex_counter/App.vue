<template>
  <div>
    <p>clicked : {{$store.state.count}} times,count is {{$store.getters.evenOrOdd}}</p>
    <button @click="add">+</button>
    <button @click="del">-</button>
    <button @click="addIfEven">奇数可加</button>
    <button @click="addAsync">异步添加</button>
  </div>
</template>

<script type="text/ecmascript-6">
/* 
  store对象包含
      1.state:包含所有state数据的对象
      2.getters：包含所有getters计算属性的对象
      3.commit(mutationsName,data):最后让mutations调用
      4.dispatch(actionName,data):最后让dispatch分发一个action
*/
  export default {
    mounted(){
      console.log(this.$store)
    },
    methods:{
      add(){
        this.$store.commit('add')
      },
      del(){
        this.$store.commit('del')
      },
      addIfEven(){
        this.$store.dispatch('addIfEven')
      },
      addAsync(){
        this.$store.dispatch('addAsync')
      }
    }
  };
</script>
<style scoped>
</style>
