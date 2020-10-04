import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
相当于data的对象
包含n个可变的属性数据
*/
const state ={
    count:1 //初始化状态数据
}
/*
一个包含n个用于直接更新状态数据的方法的对象
*/
const mutations ={
    add(state){
        state.count++
    },
    del(state){
        state.count--
    }
}
/*
 一个包含n个用于间接更新状态数据的方法的对象
 action方法中可以包含异步超和逻辑处理代码 
 */
const actions ={
    // add ({commit}){
    //     commit('add')
    // },
    // del({commit}){
    //     commit('del')
    // },
    addIfEven({commit,state}){
        if (state.count%2 ===1){
            commit('add')
        }
    },
    addAsync({commit}){
        setTimeout(() => {
            commit('add')
        },100)
    }
}
/*
一个包含n个基于state数据的getter计算属性的方法的对象
*/
const getters ={
    evenOrOdd(state){
        return state.count %2 ===1 ?'奇数' : '偶数'
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})
