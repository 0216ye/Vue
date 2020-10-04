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
        //分发一个自定义事件
        this.$eventBus.$emit("search", searchName);   
      }
    },
  },
  beforeDestroy (){
      this.$eventBus.$off('search')
  }
};
</script>

<style scoped>
</style>
