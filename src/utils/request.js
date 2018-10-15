/**
 * Created by 王磊 on 2018/9/20.
 */
/*请求拦截 在所有请求之前 统一判断token*/
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from './auth'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})
// request拦截器 请求拦截 在发送请求之前做些什么
service.interceptors.request.use(config => {
  console.log('config', config)
  console.log('1', store.getters.token)
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

export default service
