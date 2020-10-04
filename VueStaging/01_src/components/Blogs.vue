<template>
  <ul>
    <h2 >Blog列表</h2>
    <Blog v-for="(blog,index) in blogs" :key="blog.id" :blog="blog.title"></Blog>
  </ul>
</template>

<script type="text/ecmascript-6">
import Blog from "./Blog";
  export default {
  data() {
    return {
      blogs: [
        { id: 1, title: "文ss章一" },
        { id: 2, title: "文章二" },
        { id: 3, title: "文章三" },
      ],
    };
  },
  components: {
    //注册局部组件,供当前组件使用
    Blog: Blog,
  },
};
</script>

<style scoped>
/*scoped:用于限制当前组件的样式只在当前组件中生效*/
h2{
    color:red;
    font-size: 20px;
}
</style>
