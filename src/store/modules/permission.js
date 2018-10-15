/**
 * Created by 王磊 on 2018/9/25.
 */
import { asyncRouterMap, constantRouterMap } from '../../../src/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  actions: {
    GenerateRoutes({ commit }, data) {//生成路由
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        console.log('roles.indexOf',roles.indexOf('admin') >= 0)
        if (roles.indexOf('admin1') >= 0) {
          accessedRouters = asyncRouterMap
          console.log('roles.indexOf',accessedRouters)
        } else {
          console.log('filterAsyncRouter')
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          console.log('accessedRouters',accessedRouters)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      console.log('state.routers', state.routers)
    }
  }
}
export default permission
