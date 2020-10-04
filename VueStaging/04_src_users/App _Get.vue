<template>
  <div>
    <p v-if="!nameRepo">Loading...</p>
    <p v-else>
      move start repo is 
      <a :href="nameUrl">{{nameRepo}}</a>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return {
      nameRepo:'',
      nameUrl:''
    }
  },
  mounted(){
    this.$http.get('https://api.github.com/search/repositories?q=v&sort=stars')
      .then(response =>{
        let result = response.data
        let {name,html_url} = result.items[0]
        this.nameRepo = name
        this.nameUrl = html_url
      })
      .catch(error =>{
        alert('请求出错')
      })
  }
};
</script>

<style scoped>
</style>
