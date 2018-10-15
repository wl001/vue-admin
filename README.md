
##### 目录结构
```bash
├── build                                        // webpack配置文件
├── config                                       // 项目打包路径
├── src                                          // 源码目录
│   ├── api
│   │   ├── api.js                             // 请求数据接口
│   │   ├── index.js                           // 暴露 api.js模块
│   │   ├── login                              // 登陆接口
│   ├── assect                                  // 静态资源
│   ├── common                                  // 无用的代码 axios示例
│   ├── components                              // 组件
│   │   ├── card                               // 卡片悬浮效果
│   │   ├── Drag                               // 拖拽组件
│   │   ├── Echarts                            // 可视化图表
│   │   ├── error                              // 404等页面
│   │   ├── firstPage                          // 首页
│   │   ├── Home                               // 主页布局
│   │   ├── Login                              // 登陆页面
│   │   ├── Menu                               // 左侧菜单栏
│   │   ├── Table                              // table页面
│   │   ├── Tabs                               // 消息通知
│   │   ├── Vuex                               // Vuex示例
│   ├── lang                                    // 中英文转换
│   ├── mock                                    // 模拟静态数据
│   ├── router
│   │   ├── router.js                          // 路由
│   ├── store                                   // vuex数据处理
│   ├── utils                                   // 公共事件处理
│   │   ├── anth.js                            // Cookie存储token
│   │   ├── request.js                         // axios封装以及请求拦截处理
│   │   ├── validata.js                        // 表单验证登陆账号密码
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
│   ├── premission.js                           // 权限路由处理
├── static                                       // 静态资源文件
├── index.html                                   // 入口html文件
```
### 项目运行
  ![image](https://github.com/wl001/vue-admin/blob/master/static/vue-element-admin.gif)
- Axios不支持JSONP，需要另外安装jsonp模块实现
### 中英文切换 按需加载里定制 i18n
- lang/index.js
```bash
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 国际化
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages: {
    zh: require('./zh.js'), // 中文语言包
    en: require('./en.js') // 英文语言包
  }
})
export default i18n
```
- main.js引入i18n
```bash
import i18n from './lang'
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
```
- 使用方法
```bash
  toggleLanguage() {
    let locale = this.$i18n.locale
    locale === 'zh' ? (this.$i18n.locale = 'en') : (this.$i18n.locale = 'zh')
    let info = locale === 'en' ? '切换成功' : 'change language successfully'
    this.$message.success(info)
  },
```
- 路由中英文切换是在路由上多加个英文的属性，根据是否转换中英文切换路由router上的属性名称即可
```bash
 {{langType === 'en'? child.name_en: child.name}}

 computed:{
   langType() {//语言类型
     return this.$i18n.locale
   }
 },
```
##### 权限路由
util/request axios发送请求拦截
```bash
/*请求拦截 在所有请求之前 统一判断token*/
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from './auth'
// 创建axios实例
const service = axios.create({
 //config文件夹中的BASE_API的配置 api的base_url
  baseURL: process.env.BASE_API,
  timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  console.log('config', config)
  console.log('1', store.getters.token)
  if (store.getters.token) {
   // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
export default service
```
- api/login.js
- request就是axios请求之前的拦截处理
```bash
import request from '../utils/request'
export function login(username, password) {
  return request({
    url: '/user/login' + '?username=' + username,
    method: 'post'
  })
}
```
- 然后再veux中做好token和roles数据储存
- 然后permission.js根据store.getters.roles.length来判断是否有权限没有的话会发起GetInfo请求根据roles动态生成路由

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
