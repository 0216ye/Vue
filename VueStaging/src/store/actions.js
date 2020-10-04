import axios from 'axios'
import {REQUESTING,REQ_SUCCESS,REQ_ERROR} from './mutationsType'
export default {

    //搜索的异步action:包含了异步代码的action
    async search({commit},searchName){
       //请求中，提交请求中的commit
        commit(REQUESTING)
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
             //请求成功，提交成功的mutations
            commit(REQ_SUCCESS,users)
            } catch (error) {
            //请求失败，提交失败的mutations
            commit(REQ_ERROR,error.message)
            }
    
    }
}