<template>
  <div class="user-management">
    <el-row class="user-management__front">
      <el-col :span="8">
        <el-tooltip class="item" effect="dark" content="您可以通过点击此按钮新增一个用户" placement="top-start">
          <el-button type="primary" style="width: 150px" @click="handleOpen(0)">添加新用户</el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="8" style="float: right;">
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
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户头像" width="120">
        <template slot-scope="scope">
          <img
            class="user-management__header"
            :src="scope.row.header_img"
            width="75"
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="学生ID">
        <template slot-scope="scope">
          {{ scope.row.stu_id }}
        </template>
      </el-table-column>
      <el-table-column label="年级" width="150">
        <template slot-scope="scope">
          {{ scope.row.stu_id.slice(0, 4) + '级' }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="性别" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sex | statusFilter">{{ scope.row.sex === 1 ? '男' : '女' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.time | dateForm }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button style="margin-right: 10px" type="success" @click="handleOpen(1, scope.row)">修改</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.row.id)"
          >
            <el-button slot="reference" type="info">删除</el-button>
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
import request from '@/utils/request'
import moment from 'moment'
import alertDialog from '@/components/Common/dialog.vue'
import { cloneDeep } from 'lodash'

const initField = {
  stu_id: null,
  username: '',
  sex: ''
}

export default {
  components: {
    alertDialog
  },
  filters: {
    statusFilter(status) {
      const statusMap = ['success', 'gray']
      return statusMap[status]
    },
    dateForm(el) {
      el = parseInt(el)
      return moment(el).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searchData: '',
      dialogData: {
        title: '',
        visbile: false
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
        this.list = response.data
        this.listLoading = false
      })
    },
    getList(searchData) {
      if (searchData) {
        return request({
          url: '/admin/system',
          method: 'get',
          params: {
            searchData
          }
        })
      } else {
        return request({
          url: '/admin/system',
          method: 'get'
        })
      }
    },
    addList(data) {
      return request({
        url: '/admin/system/add',
        method: 'post',
        data
      })
    },
    updateList(data) {
      return request({
        url: '/admin/system/update',
        method: 'post',
        data
      })
    },
    deleteList(data) {
      return request({
        url: '/admin/system/delete',
        method: 'post',
        data
      })
    },
    remoteClose() {
      this.searchData = ''
      this.dialogData.title = ''
      this.dialogData.visbile = false
      this.formData = cloneDeep(initField)
      this.fetchData()
    },
    //  打开新增
    handleOpen(flag, row) {
      if (flag === 0) {
        this.dialogData.title = '新建'
        this.dialogData.visbile = true
      } else {
        this.dialogData.title = '修改'
        this.dialogData.visbile = true
        this.formData = {
          stu_id: row.stu_id,
          username: row.username,
          sex: row.sex,
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
    handleSearch() {
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-management {
  &__front {
    margin: 30px 0;
    padding: 0 25px;
  }
  &__header {
    border-radius: 50%;
  }
}
</style>
