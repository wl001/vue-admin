<template>
  <div class='chart-container'>
    <div id="lineId" style="width:100%; height:400px;"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default {
    props: {
      lineData: {
        type: Object,
        required: true,
        default() {
          return {
            xAxis: [],
            series1: [],
            series2: []
          }
        }
      }
    },
    data(){
      return {
        data: {
          xAxis: [],
          series1: [],
          series2: []
        }
      }
    },
    mounted(){
      this.$nextTick(function(){
        this.initChart()
      })
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById('lineId'));
        this.chart.setOption({
          title: {
            text: "近五天气温趋势",
            x: "center",
            textStyle: {
              color: "#666"
            }
          },
          grid: {
            top: "20%",
            left: "3%",
            right: "3%",
            bottom: "12%",
            containLabel: true
          },
          tooltip: {
            trigger: "axis"
          },
          toolbox: {
            show: true,
            top: 20,
            right: 20,
            feature: {
              dataView: { readOnly: false },
              magicType: { type: ["line", "bar"] },
              dataZoom: {
                yAxisIndex: "none"
              },
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            bottom: 0,
            data: ["最高气温", "最低气温"]
          },
          xAxis: {
            data: this.lineData.xAxis
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          },
          series: [
            {
              name: "最高气温",
              type: "line",
              smooth: true,
              data: this.lineData.series1.length === 0 ? [0, 0, 0, 0, 0] : this.lineData.series1,
              label: {
                normal: {
                  show: true,
                  position: "top",
                  formatter: "{c}℃"
                }
              }
            },
            {
              name: "最低气温",
              type: "line",
              smooth: true,
              data: this.lineData.series2.length === 0 ? [0, 0, 0, 0, 0] : this.lineData.series2,
              label: {
                normal: {
                  show: true,
                  position: "top",
                  formatter: "{c}℃"
                }
              }
            }
          ]
        })
      }
    },
    watch: {
      // 深度监听传入的数据变化，一定加deep属性哦
      lineData: {
        handler(val, oldVal) {
          console.log("watch回调函数被执行");
          this.data = JSON.parse(JSON.stringify(val))
          this.initChart();
        },
        deep: true
      }
    },
    components: {}
  };
</script>
<style>
  .chart-container{
    width:100%;
    height:100%;
    border: 1px solid #F3F2F0;
    overflow-y: auto;
  }
</style>
