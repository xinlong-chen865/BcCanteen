<template>
  <div class="canteen-desc">
    <el-row class="canteen-desc__front">
      <el-col :span="8">
        <el-tooltip class="item" effect="dark" content="您可以通过点击此按钮新增一个用户" placement="top-start">
          <el-button type="primary" style="width: 150px" @click="handleOpen(0)">添加新用户</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="菜品图片" width="200">
        <template slot-scope="scope">
          <img
            class="canteen-desc__header"
            :src="scope.row.goods_img"
            width="75"
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称">
        <template slot-scope="scope">
          {{ scope.row.goods_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品价格">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button style="margin-right: 10px" type="success" @click="handleOpen(1, scope.row)">修改</el-button>
          <el-popconfirm
            title="确定下架吗？"
            @onConfirm="handleDelete(scope.row.id)"
          >
            <el-button slot="reference" type="info">下架</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <alertDialog
      :title="dialogData.title"
      :visible="dialogData.visbile"
      :remote-close="remoteClose"
      :form="formData"
      @handle-submit="handleNewlyAdd"
      @handle-update="handleUpdate"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/request'
import alertDialog from '@/components/Common/dialog.vue'
import { cloneDeep } from 'lodash'

const initField = {
  bus_id: null,
  goods_name: '',
  price: null
}
export default {
  components: {
    alertDialog
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogData: {
        title: '',
        visbile: false
      },
      formData: cloneDeep(initField)
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
      this.getList({ id: this.token }).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    getList(params) {
      return request({
        url: '/business_admin/canteen-desc',
        method: 'get',
        params
      })
    },
    addList(data) {
      return request({
        url: '/business_admin/canteen-desc/add',
        method: 'post',
        data
      })
    },
    deleteList(data) {
      return request({
        url: '/business_admin/canteen-desc/delete',
        method: 'post',
        data
      })
    },
    updateList(data) {
      return request({
        url: '/business_admin/canteen-desc/update',
        method: 'post',
        data
      })
    },
    remoteClose() {
      this.dialogData.title = ''
      this.dialogData.visbile = false
      this.formData = cloneDeep(initField)
      this.fetchData()
    },
    handleOpen(flag, row) {
      this.formData.bus_id = this.token
      if (flag === 0) {
        this.dialogData.title = '新建'
        this.dialogData.visbile = true
      } else {
        this.dialogData.title = '修改'
        this.dialogData.visbile = true
        this.formData = {
          id: row.id,
          goods_name: row.goods_name,
          price: row.price,
          isUpdate: true
        }
      }
    },
    async handleNewlyAdd() {
      const { data } = await this.addList(this.formData)
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.remoteClose()
      } else {
        this.$message.error(data.message)
      }
    },
    async handleUpdate() {
      const { data } = await this.updateList(this.formData)
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.remoteClose()
      }
    },
    async handleDelete(id) {
      const { data } = await this.deleteList({ id })
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.remoteClose()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.canteen-desc {
  &__front {
    margin: 30px 0;
    padding: 0 25px;
  }
  &__header {
    border-radius: 50%;
  }
}
</style>

