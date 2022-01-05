<template>
  <div class="order-desc">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.childList"
            style="width: 100%"
          >
            <el-table-column align="center" label="菜品图片" width="120">
              <template slot-scope="scope">
                <img
                  :src="scope.row.goods_img"
                  width="120"
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="goods_id"
              label="菜品ID"
              align="center"
            />
            <el-table-column
              prop="goods_name"
              label="菜品名称"
              align="center"
            />
            <el-table-column
              prop="order_sum"
              label="购买数量"
              align="center"
            />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家头像" width="150">
        <template slot-scope="scope">
          <img
            :src="scope.row.header_img"
            style="border-radius: 50%"
            width="80"
          >
        </template>
      </el-table-column>
      <el-table-column
        label="订单号"
        prop="id"
      />
      <el-table-column
        label="买家姓名"
        prop="username"
      />
      <el-table-column
        label="买家学号"
        prop="stu_id"
      />
      <el-table-column
        label="买家联系电话"
        prop="phone"
      />
      <el-table-column
        label="买家收货地址"
        prop="address"
      />
      <el-table-column
        label="订单总额"
        prop="order_price"
      />
      <el-table-column
        label="订单创建时间"
      >
        <template slot-scope="scope">
          {{ scope.row.createTime | dateForm }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="200">
        <template slot-scope="scope">
          <el-tag>已接单</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<style lang='scss' scoped>
  .order-desc {
      &__front {
          margin: 20px;
      }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  filters: {
    dateForm(el) {
      el = parseInt(el)
      return moment(el).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      tableData: [],
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.getList().then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    getList() {
      return request({
        url: '/business_admin/order-desc',
        method: 'post',
        data: {
          userId: this.token
        }
      })
    }
  }
}
</script>
