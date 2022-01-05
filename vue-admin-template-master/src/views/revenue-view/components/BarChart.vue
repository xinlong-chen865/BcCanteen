<template>
  <div ref="main" :class="className" :style="{height: height, width: width}" />
</template>

<script>

import echarts from 'echarts'
// 引入主题
require('echarts/theme/macarons')

// 自适应窗口大小改变图表的大小
import resize from './mixins/resize'

export default {
  mixins: [resize],

  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: ''
    },
    xAxisData: { // x轴显示的数据
      type: Array,
      default: () => []
    },
    seriesData: { // 饼状图中接收的数据
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      chart: null // 引用echarts实例属性
    }
  },

  mounted() {
    // 当加载dom后，会调用 this.initChart() 来进行初始化echarts实例
    this.$nextTick(() => {
      this.initChart()
    })
  },

  // 当组件销毁之前会调用此钩子，
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    // 注销实例
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart() {
      // 初始化echarts实例，第2个参数是主题
      this.chart = echarts.init(this.$refs.main, 'macarons')
      this.chart.setOption({
        // color: ['#3398DB'],
        title: { // 标题
          text: this.title,
          left: 'center'
        },
        tooltip: { // 提示框
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: { // 柱状图整体位置
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [ // x轴
          {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            }
          }
        ],
        yAxis: [ // y 轴
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '收入',
            type: 'bar', // 柱状图
            barWidth: '60%', // 每个柱子宽度
            data: this.seriesData,
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      })

      this.chart.on('click', (params) => {
        this.$router.push({ path: '/store-information-management/information-view', query: { bus_name: params.name }})
      })
    }
  }
}
</script>
