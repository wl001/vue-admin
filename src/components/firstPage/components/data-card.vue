<template>
  <div class="data-card">
    <el-row :span="24">
      <el-col :span="span" v-for="(item,index) in data" :key="index">
        <div class="item">
          <img :src="item.src" class="item-img" />
          <div class="item-text" :style="{color:colorText,backgroundColor:bgText}">
            <h3 style="text-align: center">{{item.name}}</h3>
            <p>{{item.text}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'nx-data-card',
    data() {
      return {
        span: this.option.span || 6,
        data: this.option.data || [],
        colorText: this.option.colorText || '#fff',
        bgText: this.option.bgText || '#2e323f',
        borderColor: this.option.borderColor || '#2e323f'
      }
    },
    props: {
      option: {
        type: Object,
        default: () => {}
    }
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {}
  }
</script>

<style  scoped>
  .data-card{
    height: 300px;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .data-card .item {
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 270px;
    overflow: hidden;
    border-radius: 5px;
  }
  .data-card .item-img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .data-card .item-text {
    position: absolute;
    top: 244px;
    font-size: 16px;
    line-height: 25px;
    box-sizing: border-box;
    width: 100%;
    height: 270px;
    overflow: auto;
    -webkit-box-sizing: border-box;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    opacity: 0.7;
    -webkit-transition: top 0.4s;
    transition: top 0.4s;
  }
  .data-card .item:hover .item-text{
    position: absolute;
    top:0
  }
</style>
