/**
 * Created by 王磊 on 2018/9/20.
 */
import request from '../utils/request'
//登陆功能
export function login(username, password) {
  return request({
    url: '/user/login' + '?username=' + username,
    method: 'post'
  })
}
//登陆成功获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/info' + '?username=' + token,
    method: 'get'
  })
}
//退出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
