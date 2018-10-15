<template>
  <div id="app">
    <div class="header" ref="header_">
      <div class="logo":class="{'collapseAside':collapse}">
        <span v-if="!collapse">VUEADMIN</span>
        <span v-else>V</span>
      </div>
      <div class="tools" >
        <div class="icon"  @click="collapseChage">
          <i class="fa fa-align-justify"></i>
        </div>
        <!--面包屑导航-->
        <div style="float: left;margin: 24px 0 0 30px;color:#FFFFFF !important;">
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item  v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="userinfo">
          <!--用户设置-->
          <template>
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner"><img :src="this.avatar"/>{{this.name}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{this.name}}</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </div>
        <!--消息中心-->
        <span style="position: relative;float: right">
           <el-tooltip class="btn-bell" effect="dark" :content="this.messNum?`有${$store.getters.messNum}条未读消息`:`没有消息`" placement="bottom">
             <router-link to="/tabs">
               <i class="el-icon-bell"></i>
             </router-link>
           </el-tooltip>
          <span class="btn-bell-badge" v-if="$store.getters.messNum>0"></span>
        </span>
        <!--切换语言-->
        <span style="float: right;margin-right: 10px;color:#fff;font-size: 20px;">
            <i class="fa fa-language" title="切换语言" @click="toggleLanguage"></i>
        </span>
      </div>
    </div>
    <div class="content" ref="content_">
      <!--左侧导航-->
      <div class="aside" ref="aside" :class="{'collapseAside':collapse}">
        <NavBar :collapse="collapse"></NavBar>
      </div>
      <div class="container_" ref="container_">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script type="text/babel">
  import NavBar from '../Menu/NavBar.vue'
  import { mapGetters,mapActions } from 'vuex'
  export default {
    data(){
      return{
        collapse: false,
        fullscreen: false,
        defaultActiveIndex:'0'
      }
    },
    computed:{
      ...mapGetters([
        'messNum',
        'name',
        'avatar'
      ]),
      message(){
        return $store.getters.messNum.length>0
      }
    },
    created(){
    },
    mounted(){
      this.init();
      //初始化
    },
    methods: {
      // 调用actions的方法
      ...mapActions([
        'LogOut'
      ]),
      init(){
        let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let topH = this.$refs.header_.offsetHeight;
        this.$refs.content_.style.height = (wh - topH) +'px'

        let ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let centerW = this.$refs.aside.offsetWidth;
        console.log(centerW )
        this.$refs.container_.style.width= (ww - centerW) +'px'
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      collapseChage(){
        this.collapse = !this.collapse;
      },
      //切换语言
      toggleLanguage() {
        let locale = this.$i18n.locale
        locale === 'zh' ? (this.$i18n.locale = 'en') : (this.$i18n.locale = 'zh')
        let info = locale === 'en' ? '切换成功' : 'change language successfully'
        this.$message.success(info)
      },
      logout(){//退出登陆
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }).catch(() => {
        });
      },
    },
    components:{
      NavBar
    }
  }
</script>

<style scoped>
  .el-submenu [class^=fa] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
  }
  .header{
    width:100%;
    height: 60px;
    line-height: 60px;
    background-color: #40A3E0;
    min-width: 1024px;
    display: flex;
  }
  .header .logo{
    position: relative;
    width: 222px;
    line-height: 60px;
    font-size: 20px;
    padding-left:20px;
    padding-right:20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
    color:#ffffff;
    box-sizing:border-box;
    transition: 0.5s;
  }
  .header .tools{
    flex: 1;
    line-height: 60px;
  }
  .header .tools .icon{
    padding: 0 23px;
    width:14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    color:#ffffff;
    float: left;
  }
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
  }
  .userinfo-inner {
    cursor: pointer;
    color:#fff;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
  .content{
    display: flex;
  }
  .content .aside{
    position: relative;
    width:230px;
    height: 100%;
    box-sizing:border-box;
    transition: 0.5s;
  }

  .content .container_{
    flex: 1px;
    background-color: #ffffff;
    padding: 4px;
  }
.collapseAside{
  width:70px !important;
}
 .btn-bell{
    margin-right: 20px;
 }
  .btn-bell i{
    font-size: 17px;
    color: #fff;
  }
  .btn-bell-badge{
    position: absolute;
    right: 17px;
    top: 19px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
</style>
