/**
 * Created by 王磊 on 2018/5/22.
 */
const num = {
  state:{
    count:0,
    messageLength:0,
  },
 //actions做异步处理然后再向 mutations派发事件
  actions : {
    clickOdd:({commit ,state})=>{
      if(state.count%2 ==0){
        commit('clickOdd');
      }
    }
  },
  mutations:{
    increase(state){
       state.count ++
    },
    decrement(state){
       state.count --
    },
    clickOdd(state){
       state.count ++
    },
    message(state,message){
      state.messageLength = message
      console.log('commit', state.messageLength)
    }
  }
}
export default num
