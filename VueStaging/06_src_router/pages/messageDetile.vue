<template>
  <ul>
    <li>id:{{ id }}</li>
    <li>titile:{{ detile.title }}</li>  
    <li>content:{{ detile.content }}</li>
  </ul>
</template>

<script type="text/ecmascript-6">
const Info = [
  { id: 1, title: "message-1", content: "message-1 content" },
  { id: 2, title: "message-2", content: "message-2 content" },
  { id: 3, title: "message-3", content: "message-3 content" },
];
export default {
  props:['id'], //通过路由组件传参数，将params映射为props
  data() {
    return {
      detile: { id: "", title: "", content: "" },
    };
  },
  mounted() {
    //Vue中组件都拥有$route 属性
    //以下为初始化显示
    // const id = this.$route.params.id * 1;
    const id = this.id * 1;//通过路由组件传参数，将params映射为props
    const message = Info.find((item) => item.id === id);
    this.detile = message;
  },
  watch: {
    $route(to, from) {
      //监视路由的变化-->to为最新的路由，获取最新的id
      // const id = to.params.id * 1;
      const id = this.id * 1;
      const message = Info.find((item) => item.id === id);
      this.detile = message;
    },
  },
};
</script>

<style scoped>
</style>
