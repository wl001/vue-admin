<template>
  <div class="firstPage">
    <!--{{$t('m.firstPage.content')}}-->
    <div class="item">
      <h4>选项卡展示</h4>
      <data-tabs :option="easyDataOption"></data-tabs>
    </div>
    <div class="item">
      <data-icons  :option="easyDataOption1"></data-icons>
    </div>
    <div class="item">
      <data-card  :option="easyDataOption0"></data-card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import DataTabs from './components/data-tabs.vue'
  import DataIcons from './components/data-icon.vue'
  import DataCard from './components/data-card.vue'
  export default {
    data() {
      return {
        easyDataOption: {
          span: 6,
          data: [
            {
              title: '分类统计',
              subtitle: '实时',
              count: 7993,
              allcount: 10222,
              text: '当前分类总记录数',
              color: 'rgb(49, 180, 141)',
              key: '类'
            },
            {
              title: '附件统计',
              subtitle: '实时',
              count: 3112,
              allcount: 10222,
              text: '当前上传的附件数',
              color: 'rgb(56, 161, 242)',
              key: '附'
            },
            {
              title: '文章统计',
              subtitle: '实时',
              count: 908,
              allcount: 10222,
              text: '评论次数',
              color: 'rgb(117, 56, 199)',
              key: '评'
            },
            {
              title: '新闻统计',
              subtitle: '实时',
              count: 908,
              allcount: 10222,
              text: '评论次数',
              color: 'rgb(59, 103, 164)',
              key: '新'
            }
          ]
        },
        easyDataOption1: {
          color: 'rgb(63, 161, 255)',
          span: 4,
          data: [
            {
              title: '今日注册',
              count: 12678,
              icon: 'el-icon-info'
            },
            {
              title: '今日登录',
              count: 22139,
              icon: 'el-icon-location'
            },
            {
              title: '今日订阅',
              count: 35623,
              icon: 'el-icon-share'
            },
            {
              title: '今日评论',
              count: 16826,
              icon: 'el-icon-edit-outline'
            },
            {
              title: '今日点击',
              count: 16826,
              icon: 'el-icon-news'
            },
            {
              title: '今日浏览',
              count: 16826,
              icon: 'el-icon-service'
            }
          ]
        },
        easyDataOption0: {
          span: 6,
          borderColor: '#fff',
          data: [
            {
              name: '马化腾',
              src: 'static/images/card-1.jpg',
              text: '介绍1'
            },
            {
              name: '李易峰',
              src: 'static/images/card-2.jpg',
              text: '介绍2'
            },
            {
              name: '鹿晗',
              src: 'static/images/card-3.jpg',
              text: '介绍3'
            },
            {
              name: '王俊凯',
              src: 'static/images/card-4.jpg',
              text: '介绍4'
            }
          ]
        },
      }
    },
    components: {
      DataIcons,
      DataTabs,
      DataCard
    }
  }
</script>
<style scoped>
  h4 {
    display: block;
    -webkit-margin-before: 1.33em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
  }
</style>
