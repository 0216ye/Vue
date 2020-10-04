<template>
  <div>
    <p v-if="show">请输入姓名进行查询</p>
    <p v-else-if="Loading">Loading...</p>
    <p v-else-if="error">{{error}}</p>
     <div v-else class="row">
      <div class="card" v-for="(user) in users" :key="user.login">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.login}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
  export default {
    computed:{
      //从vuex的state中读取数据
      ...mapState(['show','Loading','users','error'])
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
