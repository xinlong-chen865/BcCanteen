<template>
  <div class="dish-management">
    <el-row class="dish-management__front">
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
          <el-table
            :data="props.row.childList"
            style="width: 100%"
          >
            <el-table-column align="center" label="菜品图片" width="120">
              <template slot-scope="scope">
                <img
                  :src="scope.row.goods_img"
                  width="75"
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="菜品ID"
              width="180"
            />
            <el-table-column
              prop="goods_name"
              label="菜品名称"
              width="180"
            />
            <el-table-column
              prop="price"
              label="菜品单价"
            />
            <el-table-column
              prop="goods_total"
              label="菜品月销量"
            />
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="success" @click="handleOpen(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="商家ID"
        prop="bus_id"
      />
      <el-table-column
        label="商家名称"
        prop="bus_name"
      />
      <el-table-column
        label="商家负责人姓名"
        prop="bus_people"
      />
      <el-table-column
        label="商家负责人手机号"
        prop="bus_phone"
      />
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

<style lang='scss' scope>
.dish-management{
    &__front{
        margin: 20px;
    }
}
</style>

<script>
import request from '@/utils/request'
import alertDialog from '@/components/Common/dialog.vue'
import { cloneDeep } from 'lodash'

const initField = {
  id: null,
  bus_id: null,
  bus_name: '',
  goods_name: '',
  price: null,
  goods_total: null
}

export default {
  components: {
    alertDialog
  },
  data() {
    return {
      tableData: [],
      listLoading: false,
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
          url: '/admin/dish-management',
          method: 'get',
          params: {
            searchData
          }
        })
      } else {
        return request({
          url: '/admin/dish-management',
          method: 'get'
        })
      }
    },
    updateList(data) {
      return request({
        url: '/admin/dish-management/update',
        method: 'post',
        data
      })
    },
    handleSearch() {
      this.fetchData()
    },
    handleOpen(row) {
      this.dialogData.title = '修改'
      this.dialogData.visible = true
      this.formData = {
        id: row.id,
        goods_name: row.goods_name,
        price: row.price,
        goods_total: row.goods_total,
        isUpdate: true
      }
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
