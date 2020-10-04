<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName" />
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      searchName: "", //搜索的用户名
    };
  },
  methods: {
    search() {
        //获取输入框输入的内容
      const searchName = this.searchName.trim();
      if (searchName) {
        //通过dispatch调用发送异步ajax的方法 
        this.$store.dispatch('search',searchName)
        this.searchName = ''
      }
    },
  },
 
};
</script>

<style scoped>
</style>
