<template>
  <div class="auth-management">
    <el-row class="auth-management__front">
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
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户头像" width="120">
        <template slot-scope="scope">
          <img
            class="auth-management__header"
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
      <el-table-column label="姓名" width="160" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" width="160" align="center">
        <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.time | dateForm }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="500">
        <template slot-scope="scope">
          <el-popconfirm
            v-if="scope.row.status === 0 || scope.row.status === 1"
            title="确定把该用户升级为超级管理员吗？"
            @onConfirm="handleSuperManger(scope.row.id)"
          >
            <el-button slot="reference" style="margin-right: 10px" type="primary">升级为超级管理员</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.status === 0"
            title="确定把该用户升级为管理员吗？"
            @onConfirm="handleManger(scope.row.id)"
          >
            <el-button slot="reference" style="margin-right: 10px" type="success">升级为管理员</el-button>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.status === 1"
            title="确定把该用户降级为用户吗？"
            @onConfirm="handleLowman(scope.row.id)"
          >
            <el-button slot="reference" style="margin-right: 10px" type="info">降级为用户</el-button>
          </el-popconfirm>
          <el-button v-if="scope.row.status === 2" type="danger" disabled>您已经成为超级管理员</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from '@/utils/request'
import moment from 'moment'

export default {
  filters: {
    dateForm(el) {
      el = parseInt(el)
      return moment(el).format('YYYY-MM-DD HH:mm:ss')
    },
    statusFilter(status) {
      const dicts = ['用户', '管理员', '超级管理员']
      return dicts[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      searchData: ''
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
          url: '/admin/auth',
          method: 'get',
          params: {
            searchData
          }
        })
      } else {
        return request({
          url: '/admin/auth',
          method: 'get'
        })
      }
    },
    updateList(data) {
      return request({
        url: '/admin/auth/update',
        method: 'post',
        data
      })
    },
    handleSearch() {
      this.fetchData()
    },
    async handleSuperManger(id) {
      const { data } = await this.updateList({ id, status: 2 })
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.fetchData()
      }
    },
    async handleManger(id) {
      const { data } = await this.updateList({ id, status: 1 })
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.fetchData()
      }
    },
    async handleLowman(id) {
      const { data } = await this.updateList({ id, status: 0 })
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: 'success'
        })
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-management {
    &__front {
        margin: 20px;
    }
}
</style>
