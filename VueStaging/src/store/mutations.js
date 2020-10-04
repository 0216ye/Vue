import {REQUESTING,REQ_SUCCESS,REQ_ERROR} from './mutationsType' 
export default {
    //函数名，或方法名是一个变量 ，可以加[]
    [REQUESTING](state){
        //请求中
        state.show = false
        state.Loading = true
    },
    [REQ_SUCCESS](state,users){
        //请求成功
        state.Loading = false
        state.users = users
    },
    [REQ_ERROR](state,message){
        //请求失败
        state.Loading = false
        state.error = message
    }

}