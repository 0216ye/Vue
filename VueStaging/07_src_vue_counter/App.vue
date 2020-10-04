<template>
  <div>
    <p>clicked : {{count}} times,count is {{evenOrOdd}}</p>
    <button @click="add">+</button>
    <button @click="del">-</button>
    <button @click="addIfEven">奇数可加</button>
    <button @click="addAsync">异步添加</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        count:0
      }
    },
    computed:{
      evenOrOdd(){
        return this.count%2 ===1 ? '奇数':'偶数'
      }
    },
    methods:{
      add(){
        this.count++
      },
      del(){
        this.count--
      },
      addIfEven(){
        if(this.count%2 === 1){
          this.count++
        }
      },
      addAsync(){
        setTimeout(() => {
          this.count++
        },1000)
      }
    }
  };
</script>
<style scoped>
</style>
