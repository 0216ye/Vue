<template>
 <div>
    <ul>
    <li v-for="(m,index) in messages" :key =m.id >
      <!--使用了动态路由，通过模版字符串实现 -->
      <router-link :to="`/home/message/detile/${m.id}`">{{m.title}}</router-link>
      --<button @click='pushShow(m.id)'>push查看</button>--<button  @click='replacShow(m.id)'>replace查看</button>
    </li>
    <button @click="backShow" >返回</button>
  </ul>
  <hr/>
   <router-view></router-view>
 </div>
</template>

<script type="text/ecmascript-6">
  export default {

    data(){
      return {
        messages:[]
      }
    },
    mounted(){
      const messages = [
        {id:1,title:'message-1'},
        {id:2,title:'message-2'},
        {id:3,title:'message-3'}
      ]
      setTimeout(() => {
        this.messages = messages
      })
    },
    methods:{
      //通过history添加路径-->可以返回
      pushShow(id){
        this.$router.push(`/home/message/detile/${id}`)
      },  
      replacShow(id){
        console.log(this.$router)
        this.$router.replace(`/home/message/detile/${id}`)
      },
      backShow(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

 
</style>
