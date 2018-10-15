/**
 * Created by 王磊 on 2018/9/20.
 */

import { login,logout,getInfo} from '../../api/login'
import { getToken, setToken, removeToken } from '../../utils/auth'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  actions:{
  // 登录
    Login({ commit }, userInfo) {
      console.log('接受login的dispath请求',userInfo)
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log('登陆成功数据', response)
          const data = response.data.data;
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo({commit, state}){
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          console.log('userInfo', response)
          const data = response.data.data;
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
          console.log(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getInfo(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  }

}
export default user
