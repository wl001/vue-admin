/**
 * Created by 王磊 on 2018/9/21.
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from './utils/auth' // 验权
// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  console.log('获取tolen', getToken());
  if (getToken()) {
    console.log('111', to.path);
    if (to.path === '/login') {
      next({ path: '/firstPage' })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }else{
      console.log('from', from);
      console.log('to', to);
      //console.log('用户是否已拉取完user_info信息==src==', store.getters.roles.length === 0)
      //判断有没有权限role 没有则发送数据请求和动态添加路由
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          var roles = store.getters.roles
          console.log(roles)
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            console.log(store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true })  // hack方法 确保addRoutes已完成
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      }else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //console.log('没有动态改变权限的需求可直接next() 删除下方权限判断 ↓', store.getters.roles, to.meta.role)
        if (hasPermission(store.getters.roles, to.meta.role)) {//判断用户权限和路由权限role是否相等
          console.log('匹配路由')
          next()//
        }else{
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  }else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

