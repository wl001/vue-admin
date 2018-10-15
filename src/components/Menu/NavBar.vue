<template>
  <el-menu class="sidebar-el-menu" :default-active="defaultActiveIndex" :collapse="collapse" background-color="#324157"
           text-color="#bfcbd9"  active-text-color="#20a0ff" unique-opened router>
      <template  v-for="(item,index) in permission_routers" v-if="!item.hidden">
        <el-submenu :index="index+''" :key="item.index" v-if="!item.leaf">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{langType === 'en'? item.name_en: item.name}}</span>
          </template>
          <el-menu-item class="child_menu" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"
                        :class="$route.path==child.path?'is-active':''">
             <span slot="title">{{langType === 'en'? child.name_en: child.name}}</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"
                      :class="$route.path==item.children[0].path?'is-active':''">
        <i :class="item.iconCls"></i>
        <span slot="title">{{langType === 'en'? item.children[0].name_en: item.children[0].name}}</span>
        </el-menu-item>

        <!--<template v-if="item.subs">-->
          <!--<el-submenu :index="item.index" :key="item.index">-->
            <!--<template slot="title">-->
              <!--<i :class="item.icon"></i><span slot="title">{{langType === 'en'? item.name_en: item.title}}</span>-->
            <!--</template>-->
            <!--<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">-->
              <!--{{langType === 'en'? subItem.name_en: subItem.title}}-->
            <!--</el-menu-item>-->
          <!--</el-submenu>-->
        <!--</template>-->
        <!--<template v-else>-->
          <!--<el-menu-item :index="item.index" :key="item.index">-->
            <!--<i :class="item.icon"></i><span slot="title"> {{langType === 'en'? item.name_en: item.title}}</span>-->
          <!--</el-menu-item>-->
        <!--</template>-->
      </template>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
    export default {
      props:{
        collapse:Boolean
      },
      data() {
        return {
          defaultActiveIndex: '0',
          items: [
            {
              icon: 'el-icon-setting',
              name_en: 'index',
              index: 'Login',
              title: '系统首页'
            },
            {
              icon: 'el-icon-tickets',
              index: 'table',
              name_en: 'table',
              title: '基础表格'
            },
            {
              icon: 'el-icon-location-outline',
              index: 'tabs',
              name_en: 'tabss',
              title: 'tab选项卡'
            },
            {
              icon: 'el-icon-rank',
              index: '0',
              title: '拖拽列表',
              subs:[
                {
                  icon: 'el-icon-rank',
                  index: 'drag',
                  name_en: 'drag',
                  title: '拖拽看板'
                },
                {
                  icon: 'el-icon-rank',
                  index: 'dragList',
                  name_en: 'dragList',
                  title: '拖拽列表'
                }
              ]
            },
            {
              icon: 'el-icon-star-on',
              index: '1',
              title: 'echarts图表',
              subs: [
                {
                  index: 'echart',
                  name_en: 'echart',
                  title: '折线图',
                },
                {
                  index: 'echart_weather',
                  name_en: 'echart_weather',
                  title: '天气预报',
                }
              ]
            },
            {
              icon: 'el-icon-date',
              index: '2',
              title: '富文本编辑器',
              subs: [
                {
                  index: 'editor',
                  title: '富文本编辑器'
                },
                {
                  index: 'markdown',
                  title: 'markdown编辑器'
                },
              ]
            },
            {
              icon: 'el-icon-date',
              index: '3',
              title: '小组件',
              subs: [
                {
                  index: 'card',
                  title: '小卡片'
                }
              ]
            },
            {
              icon: 'el-icon-error',
              index: 'list',
              title: '列表'
            },
            {
              icon: 'el-icon-error',
              index: 'vuex',
              title: 'Vuex测试'
            },
            {
              icon: 'el-icon-error',
              index: 'permission',
              title: '权限测试'
            },
            {
              icon: 'el-icon-error',
              index: '4',
              title: '错误页面',
              subs: [
                {
                  index: 'error_404',
                  title: '404页面'
                },
                {
                  index: 'error_403',
                  title: '403页面'
                },
              ]
            }
          ]
        }
      },
      methods:{
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
      },
      computed:{
        ...mapGetters([
          'permission_routers'
        ]),
        //语言
        langType() {
          return this.$i18n.locale
        }
      },
    };
</script>
<style>
  .el-menu{
    height: 100%;
    border-radius: 2px;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #eef1f6;
  }
  .el-menu-item{
    background-color: #e4e8f1;

  }
  .child_menu{
    padding-left: 50px !important;
  }
  /*这个class是必须的 否则收起的时候没动画*/
  .sidebar-el-menu:not(.el-menu--collapse) {
      width: 222px;
      min-height: 400px;
      overflow-y:auto;
    }


</style>
