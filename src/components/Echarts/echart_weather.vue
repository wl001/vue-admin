<template>
  <div class="charts">
    <el-row class="sel-row" style="margin-top: 10px;">
      <el-col :span="3" class="sel-label">选择城市：</el-col>
      <el-col :span="3">
        <el-select  style="margin-top: 5px;" size="mini" v-model="sel" filterable placeholder="请选择城市" @change="getData">
          <el-option v-for="(item,index) in options" :label="item.label" :value="item.value" :key="index">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="4">
        <el-card class="box-card">
          {{'实时温度：' + (cityData.wendu || 'XX') + '℃'}}
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card class="box-card">
          {{'空气质量：' + ( cityData.aqi || '暂无' )}}
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card">
          {{cityData.ganmao || '暂无提示'}}
        </el-card>
      </el-col>
    </el-row>
    <div class="chart-wrap">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <div class="animated fadeIn">
              <!-- 这里是折线图组件 -->
              <lineChart :lineData="lineData"></lineChart>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import lineChart from  './lineEcharts.vue'
  // 引入城市列表
  import arr from "../../assets/json/cityList.json";
  // 引入支持jsonp的库 https://github.com/webmodules/jsonp
  // axios不支持jsonp https://github.com/axios/axios/blob/master/COOKBOOK.md#jsonp
  import jsonp from "jsonp";
    export default {
        data(){
          return {
            cityData: {},
            options: arr,
            sel: "101010100",
            lineData: {
              xAxis: [],
              series1: [],
              series2: []
            },
            tableData: []
          };
        },
      mounted() {
        this.$nextTick(function(){
          this.getData();
        })

      },
        methods: {
          getData() {
            jsonp("http://wthrcdn.etouch.cn/weather_mini?citykey=" + this.sel, (err, res) => {
              console.log('data', res.data)
                if (err) {
                  console.error(err.message);
                } else {
                  let data = res.data;
                  this.cityData = data;
                  this.renderChart(data.forecast);
                  this.renderTable(data.forecast);
                }
              }
            );
          },
          renderChart(data) {
            this.lineData.xAxis = [];
            this.lineData.series1 = [];
            this.lineData.series2 = [];
            data.forEach((v, i) => {
              this.lineData.xAxis.push(v.date);
              //"高温 35℃"  只留35
              this.lineData.series1.push(v.high.match(/-|\d+/g).join(""));
              this.lineData.series2.push(v.low.match(/-|\d+/g).join(""));
            });
          },
          renderTable(data) {
            this.tableData = [];
            data.forEach((v, i) => {
              var obj = {
                date: v.date,
                high: v.high.match(/-|\d+/g).join(""),
                low: v.low.match(/-|\d+/g).join("")
              };
              this.tableData.push(obj);
            });
          }
        },
        computed: {},
        components: {
          lineChart
        }
    };
</script>
  <style scoped >
    .charts>>>.el-card__body {
      padding: 15px;
    }
    .charts{
      border: 1px solid #ddd;
      border-radius: 5px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
    }
  .sel-row {
    margin-bottom: 20px;
  }
  .sel-label {
    line-height: 40px;
    padding-left: 20px;
  }
  /*.chart-wrap {*/
    /*margin-top: 20px;*/
  /*}*/

  /*.el-card__header {*/
    /*padding: 10px 20px !important;*/
  /*}*/

  /*.ct {*/
    /*float: right;*/
    /*line-height: 21px;*/
  /*}*/
  /*.ct:hover {*/
    /*color: #20a0ff;*/
    /*cursor: pointer;*/
  /*}*/
</style>
