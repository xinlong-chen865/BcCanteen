<template>
  <div class="information-view">
    <el-row class="information-view__front">
      <el-col :span="8" style="float: left;">
        <el-input
          v-model="searchData"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          @keyup.enter.native="handleSearch"
        />
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商家名">
              <span>{{ props.row.bus_name }}</span>
            </el-form-item>
            <el-form-item label="商家ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="层数">
              <span>{{ props.row.floor_id | filterFloor }}</span>
            </el-form-item>
            <el-form-item label="商家分类">
              <span>{{ props.row.category_id | filterCategory }}</span>
            </el-form-item>
            <el-form-item label="负责人姓名">
              <span>{{ props.row.bus_people }}</span>
            </el-form-item>
            <el-form-item label="负责人手机号">
              <span>{{ props.row.bus_phone }}</span>
            </el-form-item>
            <el-form-item label="商家地址">
              <span>{{ props.row.bus_address }}</span>
            </el-form-item>
            <el-form-item label="商家月销量">
              <span>{{ props.row.bus_sales + '单' }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商家ID"
        prop="id"
      />
      <el-table-column
        label="层数"
        prop="floor_id"
      />
      <el-table-column
        label="商家名"
        prop="bus_name"
      />
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button style="margin-right: 10px" type="success" @click="handleOpen(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <alert-dialog
      :title="dialogData.title"
      :visible="dialogData.visible"
      :remote-close="remoteClose"
      :form="formData"
      @handle-update="handleUpdate"
    />
  </div>

</template>

<style lang='scss' scoped>
  .information-view {
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
import alertDialog from '@/components/Common/dialog.vue'
import { cloneDeep } from 'lodash'

const category_dict = ['快餐', '面条', '辣椒', '汉堡', '烧烤', '西餐', '粥汤', '水饺']
const initField = {
  id: null,
  floor_id: null,
  category_id: null,
  bus_name: '',
  bus_phone: '',
  bus_people: '',
  bus_address: ''
}

export default {
  components: {
    alertDialog
  },
  filters: {
    filterCategory(el) {
      return category_dict[Number(el) - 1]
    },
    filterFloor(el) {
      let ret
      switch (el) {
        case 1000:
          ret = '一层'
          break
        case 2000:
          ret = '二层'
          break
        case 3000:
          ret = '三层'
          break
      }
      return ret
    }
  },
  data() {
    return {
      tableData: [],
      listLoading: true,
      searchData: '',
      dialogData: {
        title: '',
        visible: false
      },
      formData: cloneDeep(initField)
    }
  },
  watch: {
    searchData(newval, oldval) {
      if (newval !== oldval && !newval) {
        this.fetchData()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.getList(this.searchData).then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    getList(searchData) {
      if (searchData) {
        return request({
          url: '/admin/information-view',
          method: 'get',
          params: {
            searchData
          }
        })
      } else {
        return request({
          url: '/admin/information-view',
          method: 'get'
        })
      }
    },
    updateList(data) {
      return request({
        url: '/admin/information-view/update',
        method: 'post',
        data
      })
    },
    handleOpen(row) {
      this.dialogData.title = '修改'
      this.dialogData.visible = true
      this.formData = {
        id: row.id,
        floor_id: row.floor_id,
        category_id: row.category_id,
        bus_name: row.bus_name,
        bus_phone: row.bus_phone,
        bus_people: row.bus_people,
        bus_address: row.bus_address,
        isUpdate: true
      }
    },
    handleSearch() {
      this.fetchData()
    },
    async handleUpdate() {
      const { data } = await this.updateList({ ...this.formData })
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.remoteClose()
      }
    },
    remoteClose() {
      this.searchData = ''
      this.dialogData.title = ''
      this.dialogData.visible = false
      this.formData = cloneDeep(initField)
      this.fetchData()
    }
  }
}
</script>
