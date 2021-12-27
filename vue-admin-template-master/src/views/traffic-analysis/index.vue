<template>
  <div class="purchase-statistics">
    <div class="purchase-statistics__filter">
      <el-form ref="form" :model="filterData" label-width="80px">
        <el-form-item label="层数">
          <el-radio-group v-model="filterData.floor_id">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1000">一层</el-radio>
            <el-radio :label="2000">二层</el-radio>
            <el-radio :label="3000">三层</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商家种类">
          <el-radio-group v-model="filterData.category_id">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">快餐</el-radio>
            <el-radio :label="2">面条</el-radio>
            <el-radio :label="3">辣椒</el-radio>
            <el-radio :label="4">汉堡</el-radio>
            <el-radio :label="5">烧烤</el-radio>
            <el-radio :label="6">西餐</el-radio>
            <el-radio :label="7">粥汤</el-radio>
            <el-radio :label="8">水饺</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="访问量区间">
          <el-radio-group v-model="filterData.sales">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="1">0-2000</el-radio>
            <el-radio :label="2">2000-8000</el-radio>
            <el-radio :label="3">8000-15000</el-radio>
            <el-radio :label="4">15000以上</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <bar-chart v-if="isShow" :x-axis-data="chartObj.bus_name" :series-data="chartObj.bus_pageview" />
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import BarChart from './components/BarChart'

export default {
  components: {
    BarChart
  },
  data() {
    return {
      isShow: false,
      filterData: {
        floor_id: 0, // 0:全部 | 1 | 2 | 3
        category_id: 0,
        sales: 0
      },
      list: null,
      chartObj: {}
    }
  },
  watch: {
    filterData: {
      async handler(newVal, oldVal) {
        this.isShow = false
        await this.fetchData()
        this.isShow = true
      },
      deep: true
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async fetchData() {
      const response = await this.getList(this.filterData)
      this.list = response.data
      this.chartObj = response.merge_obj
      this.isShow = true
    },
    getList(filterData) {
      return request({
        url: '/admin/traffic-analysis',
        method: 'post',
        data: {
          filterData
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.purchase-statistics {
    &__filter {
        box-sizing: border-box;
        height: 200px;
        padding: 20px 40px;
    }
}
</style>
