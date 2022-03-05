<template>
  <div class="audit-newuser">
    <el-row class="audit-newuser__front">
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
            class="audit-newuser__header"
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
          <el-tag type="primary">用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.time | dateForm }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="500">
        <template slot-scope="scope">
          <el-button type="danger" style="margin-right: 10px" @click="handleOperation(1, scope.row)">同意申请</el-button>
          <el-popconfirm
            title="确定拒绝该用户的申请吗？"
            @onConfirm="handleOperation(4, scope.row)"
          >
            <el-button slot="reference" style="margin-right: 10px" type="info">拒绝申请</el-button>
          </el-popconfirm>
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
          url: '/admin/audit-newuser',
          method: 'get',
          params: {
            searchData
          }
        })
      } else {
        return request({
          url: '/admin/audit-newuser',
          method: 'get'
        })
      }
    },
    updateList(data) {
      return request({
        url: '/admin/audit-newuser/update',
        method: 'post',
        data
      })
    },
    handleSearch() {
      this.fetchData()
    },
    async handleOperation(flag, row) {
      const { data } = await this.updateList({ id: row.id, status: flag })
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
.audit-newuser {
    &__front {
        margin: 20px;
    }
}
</style>
