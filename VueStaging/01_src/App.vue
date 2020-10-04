<template>
    <div>
        {{title}}
        <Blogs/>
    </div>
</template>

<script>
import Blogs from './components/Blogs'
export default {
//配置对象
    data(){
        return {
            title:'你好11'
        }
    },
    components:{
        Blogs
    }    
}
</script>

<style>
  
</style>