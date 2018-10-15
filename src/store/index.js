/**
 * Created by 王磊 on 2018/5/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import logger from 'vuex/dist/logger'; // logger是一个日志插件

import num from './modules/num'
import user from './modules/user'//用户登录
import permission from './modules/permission'//根据权限生成路由列表
import getters from './getters'

// 创建 store 实例
export default new Vuex.Store({
  plugins:[logger()],
  modules: {
    user,
    num,
    permission
  },
  getters
})
