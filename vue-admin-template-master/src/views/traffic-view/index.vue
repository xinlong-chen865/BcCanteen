<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card :shadow="filter === 'month' ? 'always' : 'hover'" @click.native="handleChoose('month')">
          月访问量查看
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :shadow="filter === 'day' ? 'always' : 'hover'" @click.native="handleChoose('day')">
          日访问量查看
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :shadow="filter === 'time' ? 'always' : 'hover'" @click.native="handleChoose('time')">
          时访问量查看
        </el-card>
      </el-col>
    </el-row>
    <div>
      <bar-chart
        v-if="isShow"
        :x-axis-data="chartObj.time"
        :series-data="chartObj.count"
        :title="chartTitle"
      />
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import BarChart from './components/BarChart'
import { mapGetters } from 'vuex'

export default {
  components: {
    BarChart
  },
  data() {
    return {
      filter: 'month',
      isShow: false,
      chartObj: {}
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    chartTitle() {
      if (this.filter === 'month') {
        return '月访问量查看'
      } else if (this.filter === 'day') {
        return '日访问量查看'
      }
      return '时访问量查看'
    }
  },
  async mounted() {
    await this.fetchData()
  },
  methods: {
    async handleChoose(flag) {
      this.isShow = false
      this.filter = flag
      await this.fetchData()
      this.isShow = true
    },
    async fetchData() {
      const response = await this.getList()
      this.chartObj = response.data
      this.isShow = true
    },
    getList() {
      return request({
        url: '/business_admin/traffic-view',
        method: 'post',
        data: {
          bus_id: this.token,
          type: this.filter
        }
      })
    }
  }
}
</script>
