import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//刚开始加载的路由
export const constantRouterMap = [
  {
    path: '/login',
    component: resolve => require(['../components/Login/Login.vue'], resolve),
    name:'Login',
    hidden: true
  },
  {
    path: '/',
    redirect: '/firstPage',
    hidden: true
  },
  {
    path:'/home',
    name:'首页',
    leaf: true, // 只有一个节点
    iconCls: 'el-icon-setting',
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    children: [
      {
        path: '/firstPage',
        name: '首页',
        name_en:'HomePage',
        component: resolve => require(['../components/firstPage/firstPage.vue'], resolve),
      }
    ]
  },
  {
    path:'/home',
    name:'数据表格',
    name_en:'DataForm',
    iconCls: 'el-icon-tickets',
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    children: [
      {
        path:'/table',
        name:'基础表格',
        name_en:'table',
        meta: { roles: ['admin'] },
        component: resolve => require(['../components/Table/Table.vue'], resolve),
      },
    ]
  },
  {
    path:'/home',
    name:'标签页',
    name_en:'Tabs',
    leaf: true, // 只有一个节点
    iconCls: 'el-icon-printer',
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    children: [
      {
        path: '/tabs',
        name: '消息通知',
        name_en:'Message',
        component: resolve => require(['../components/Tabs/tabs.vue'], resolve),
      },
    ]
  }
]

export default new Router({
  mode: 'history', //后端支持可开
  likActiveClass: 'link-active',
  routes: constantRouterMap
})

//异步加载的路由
export const asyncRouterMap = [
  {
    path:'/home',
    name:'权限测试页',
    name_en:'Tabs',
    iconCls: 'el-icon-printer',
    meta: {
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    children: [
      {
        path: '/page_permission',
        name: '页面权限',
        name_en:'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        component: resolve => require(['../components/permission/page.vue'], resolve),
      },
      {
        path: '/btn_permission',
        name: '按钮权限',
        name_en:'BtnPermission',
        meta: {
          title: 'BtnPermission',
          roles: ['admin', 'editor'] // or you can only set roles in sub nav
        },
        component: resolve => require(['../components/permission/btn.vue'], resolve),
      },
    ]
  },
  {
    path:'/home',
    name:'图表',
    name_en:'Charts',
    iconCls: 'el-icon-picture-outline',
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path:'/echart',
        name:'折线图',
        name_en:'Discount',
        component: resolve => require(['../components/Echarts/echart.vue'], resolve),
      },
      {
        path:'/echart_weather',
        name:'天气预报',
        name_en:'WeatherDis',
        component: resolve => require(['../components/Echarts/echart_weather.vue'], resolve),
      }
    ]
  },
  {
    path:'/home',
    name:'拖拽',
    name_en:'Drag',
    iconCls: 'el-icon-news',
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: '/drag',
        name: '拖拽看板',
        name_en:'Kanban',
        component: resolve => require(['../components/Drag/dragView.vue'], resolve),
      },
      {
        path: '/dragList',
        name: '拖拽列表',
        name_en:'DragList',
        component: resolve => require(['../components/Drag/drag.vue'], resolve),
      },
      {
        path: '/drag_kanban',
        name: '自定义布局',
        name_en:'DragList',
        component: resolve => require(['../components/Drag/dragMenu.vue'], resolve),
      },
    ]
  },
  {
    path:'/home',
    name:'小组件',
    name_en:'Components',
    iconCls: 'el-icon-search',
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: '/vuex',
        name: 'Vuex',
        name_en:'Vuex',
        component: resolve => require(['../components/Vuex/Vuex.vue'], resolve),
      },
      {
        path: '/card',
        name:'卡片',
        name_en:'Card',
        component: resolve => require(['../components/card/card.vue'], resolve),
      },
    ]
  },
  {
    path:'/home',
    name:'表单',
    name_en:'From',
    iconCls: 'el-icon-info',
    component: resolve => require(['../components/Home/Home.vue'], resolve),
    children: [
      {
        path: '/editor',
        name: '富文本编辑器',
        name_en:'Editor',
        component: resolve => require(['../components/Editor/VueEditor.vue'], resolve),
        meta: {
          roles: ['admin']
        },
      },
      {
        path: '/markdown',
        name: 'markdown编辑器',
        name_en:'MarkDown',
        component: resolve => require(['../components/Editor/Markdown.vue'], resolve),
        meta: {
          roles: ['admin']
        },
      },
      {
        path: '/403',
        name:'403',
        component: resolve => require(['../components/error/403.vue'], resolve),
      },
      {
        path: '/404',
        name:'404',
        component: resolve => require(['../components/error/404.vue'], resolve),
      },
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

//let routes = [
//  {
//    path: '/',
//    redirect: { path: '/login' },
//    hidden: true
//  },
//  {
//    path: '/login',
//    component: resolve => require(['../components/Login/Login.vue'], resolve),
//    name:'Login',
//    hidden: true
//  },
//  {
//    path:'/home',
//    name:'首页',
//    leaf: true, // 只有一个节点
//    iconCls: 'el-icon-setting',
//    component: resolve => require(['../components/Home/Home.vue'], resolve),
//    children: [
//      {
//        path: '/firstPage',
//        name: '首页',
//        name_en:'HomePage',
//        meta: { requireAuth: true },
//        component: resolve => require(['../components/List/List.vue'], resolve),
//      }
//    ]
//  },
//  {
//    path:'/home',
//    name:'数据表格',
//    name_en:'DataForm',
//    iconCls: 'el-icon-tickets',
//    component: resolve => require(['../components/Home/Home.vue'], resolve),
//    children: [
//      {
//        path:'/table',
//        name:'基础表格',
//        name_en:'table',
//        meta: { requireAuth: true },
//        component: resolve => require(['../components/Table/Table.vue'], resolve),
//      }
//    ]
//  },
//  {
//    path:'/home',
//    name:'图表',
//    name_en:'Charts',
//    iconCls: 'el-icon-picture-outline',
//    component: resolve => require(['../components/Home/Home.vue'], resolve),
//    children: [
//      {
//        path:'/echart',
//        name:'折线图',
//        name_en:'Discount',
//        component: resolve => require(['../components/Echarts/echart.vue'], resolve),
//      },
//      {
//        path:'/echart_weather',
//        name:'天气预报',
//        name_en:'WeatherDis',
//        component: resolve => require(['../components/Echarts/echart_weather.vue'], resolve),
//      }
//    ]
//  },
//  {
//    path:'/home',
//    name:'标签页',
//    name_en:'Tabs',
//    leaf: true, // 只有一个节点
//    iconCls: 'el-icon-printer',
//    component: resolve => require(['../components/Home/Home.vue'], resolve),
//    children: [
//      {
//        path: '/tabs',
//        name: '消息通知',
//        name_en:'Message',
//        component: resolve => require(['../components/Tabs/tabs.vue'], resolve),
//      },
//    ]
//  },
//  {
//    path:'/home',
//    name:'拖拽',
//    name_en:'Drag',
//    iconCls: 'el-icon-news',
//    component: resolve => require(['../components/Home/Home.vue'], resolve),
//    children: [
//      {
//        path: '/drag',
//        name: '拖拽看板',
//        name_en:'Kanban',
//        component: resolve => require(['../components/Drag/dragView.vue'], resolve),
//      },
//      {
//        path: '/dragList',
//        name: '拖拽列表',
//        name_en:'DragList',
//        component: resolve => require(['../components/Drag/drag.vue'], resolve),
//      },
//      {
//        path: '/drag_kanban',
//        name: '自定义布局',
//        name_en:'DragList',
//        component: resolve => require(['../components/Drag/dragMenu.vue'], resolve),
//      },
//    ]
//  },
//  {
//    path:'/home',
//    name:'小组件',
//    name_en:'Components',
//    iconCls: 'el-icon-search',
//    component: resolve => require(['../components/Home/Home.vue'], resolve),
//    children: [
//      {
//        path: '/vuex',
//        name: 'Vuex',
//        name_en:'Vuex',
//        component: resolve => require(['../components/Vuex/Vuex.vue'], resolve),
//      },
//      {
//        path: '/card',
//        name:'卡片',
//        name_en:'Card',
//        component: resolve => require(['../components/card/card.vue'], resolve),
//      },
//    ]
//  },
//  {
//    path:'/home',
//    name:'表单',
//    name_en:'From',
//    iconCls: 'el-icon-info',
//    component: resolve => require(['../components/Home/Home.vue'], resolve),
//    children: [
//      {
//        path: '/editor',
//        name: '富文本编辑器',
//        name_en:'Editor',
//        component: resolve => require(['../components/Editor/VueEditor.vue'], resolve)
//      },
//      {
//        path: '/markdown',
//        name: 'markdown编辑器',
//        name_en:'MarkDown',
//        component: resolve => require(['../components/Editor/Markdown.vue'], resolve)
//      },
//      {
//        path: '/permission',
//        name:'权限测试',
//        name_en:'Jurisdiction',
//        component: resolve => require(['../components/Permission/Permission.vue'], resolve),
//      },
//      {
//        path: '/403',
//        name:'403',
//        component: resolve => require(['../components/error/403.vue'], resolve),
//      },
//      {
//        path: '/404',
//        name:'404',
//        component: resolve => require(['../components/error/404.vue'], resolve),
//      },
//    ]
//  },
//  {
//    path: '*',
//    hidden: true,
//    redirect: { path: '/404' }
//  }
//];
//
//export default new Router({
//  likActiveClass: 'link-active',
//  mode: 'history',  // 去掉路由地址的#
//  routes
//})
