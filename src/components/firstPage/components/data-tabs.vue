<template>
  <div class="data-tabs">
    <el-row :span="24">
      <el-col :span="span" v-for="(item,index) in data" :key="index">
        <div class="item" :style="{background:item.color}">
          <div class="item-header">
            <p>{{item.title}}</p>
            <span>{{item.subtitle}}</span>
          </div>
          <div class="item-body">
            <h2>
              <!--动态数字组件-->
              <count-up :start="14" :end="item.count"/>
            </h2>
          </div>
          <div class="item-footer">
            <span>{{item.allcount}}</span>
            <p>{{item.text}}</p>
          </div>
          <p class="item-tip">{{item.key}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import CountUp from './count-up.vue'
  export default {
    components: {
      CountUp
    },
    name: 'nx-data-tabs',
    data() {
      return {
        span: this.option.span || 6,
        data: this.option.data || []
      }
    },
    props: {
      option: {
        type: Object,
        default: () => {}
    }
  }
  }
</script>

<style  scoped>

  .data-card .item {
    position: relative;
    margin: 0 auto;
    margin-bottom: 50px;
    width: 230px;
    height: 340px;
    overflow: hidden;
    border-radius: 5px;
    border-color: #fff;
    border-width: 1px;
    border-style: solid;
  }
  .data-card .item:hover .item-text {
    top: 0;
  }
  .data-card .item-img {
    width: 100%;
    background: red;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .data-card .item-text {
    position: absolute;
    top: 150px;
    padding: 20px 15px;
    width: 100%;
    height: 340px;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    opacity: 0.9;
    -webkit-transition: top 0.4s;
    transition: top 0.4s;
  }
  .data-card .item-text > p {
    font-size: 12px;
    line-height: 25px;
    text-indent: 2em;
  }
  .nx-data-display .item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 5px 0;
    text-align: center;
  }
  .nx-data-display .count {
    margin: 8px 0;
    font-weight: bold;
    font-size: 32px;
    color: #15A0FF;
  }
  .nx-data-display .title {
    color: #999;
  }
  .nx-data-display .splitLine {
    display: block;
    margin: 0 auto;
    width: 24px;
    height: 1px;
    background: #9B9B9B;
  }
  .data-icons .item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 80px;
    margin: 0 auto;
  }
  .data-icons .item-icon {
    margin-top: 3px;
    margin-right: 8px;
  }
  .data-icons .item-icon > i {
    font-size: 46px !important;
  }
  .data-icons .item-info {
    line-height: 25px;
  }
  .data-icons .item-info > span {
    color: #999;
    font-size: 12px;
  }
  .data-icons .item--easy > .item-icon {
    margin: 0;
  }
  .data-icons .item--easy > .item-info {
    margin-top: -15px;
  }
  .data-icons .item--easy > .item-info > span {
    font-size: 14px;
  }
  .data-tabs .item {
    position: relative;
    margin: 15px;
    padding: 12px;
    height: 144px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    color: #fff;
  }
  .data-tabs .item-header {
    position: relative;
  }
  .data-tabs .item-header > p {
    margin: 0px;
    font-size: 14px;
  }
  .data-tabs .item-header > span {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.3);
  }
  .data-tabs .item-body > h2 {
    margin: 0;
    font-size: 32px;
    line-height: 60px;
  }
  .data-tabs .item-footer {
    line-height: 16px;
  }
  .data-tabs .item-footer > span {
    font-size: 10px;
  }
  .data-tabs .item-footer > p {
    margin: 0px;
    font-size: 12px;
  }
  .data-tabs .item-tip {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    width: 80px;
    height: 80px;
    bottom: 10px;
    right: 10px;
    border: 2px solid #fff;
    border-radius: 100%;
    font-size: 48px;
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
    opacity: 0.1;
  }

</style>
