<template>
  <div>
    <p v-if="show">请输入姓名进行查询</p>
    <p v-else-if="Loading">Loading...</p>
    <p v-else-if="error">{{error}}</p>
     <div v-else class="row">
      <div class="card" v-for="(user,index) in users" :key="user.login">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.login}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    data (){
      return {
        show:true,//展示提示内容
        Loading:false,//加载
        users:[],//用户列表数组
        error:''//错误信息
      }
    },
    mounted (){
      //绑定自定义事件
      this.$eventBus.$on('search', async(searchName)=>{
        //更改页面
        this.show = false
        this.Loading = true

        try {
        //发送请求
        let response = await axios.get('https://api.github.com/search/users',{params:{q:searchName}})
        //  取消加载
        this.Loading = false
        let result = response.data
        //将获取到的所有的数组遍历，返回数组中指定的三个属性即可
        let users =  result.items.map(user => ({
          html_url:user.html_url,
          avatar_url:user.avatar_url,
          login:user.login
        }))
        this.users = users
        } catch (error) {
        //取消加载
            this.Loading = false
            this.error = error.message
        }
          // .then(
          //   response =>{
          //
          //     let result = response.data
          //     //将获取到的所有的数组遍历，返回数组中指定的三个属性即可
          //     let users =  result.items.map(user => ({
          //       html_url:user.html_url,
          //       avatar_url:user.avatar_url,
          //       login:user.login
          //     }))
          //     this.users = users
          //   },
          //   error =>{
          //     //取消加载
          //     this.Loading = false
          //     this.error = error.message
          //   }
          // ) 
      })
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }

</style>
