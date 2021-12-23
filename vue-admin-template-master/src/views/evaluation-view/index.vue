<template>
  <div class="evaluation-view">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="120">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商家名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.bus_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="评价内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="500">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDesc(scope.row.content)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <alertDialog
      :title="dialogData.title"
      :visible="dialogData.visbile"
      :remote-close="remoteClose"
      :form="formData"
    />
  </div>
</template>

<script>
import request from '@/utils/request'
import { cloneDeep } from 'lodash'
import alertDialog from '@/components/Common/dialog.vue'

const initField = {
  content: ''
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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    getList(searchData) {
      return request({
        url: '/admin/evaluation-view',
        method: 'get'
      })
    },
    handleDesc(desc) {
      this.dialogData.title = '详情'
      this.dialogData.visbile = true
      this.formData = {
        eval_content: desc
      }
    },
    remoteClose() {
      this.dialogData.title = ''
      this.dialogData.visbile = false
      this.formData = cloneDeep(initField)
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.evaluation-view {
    &__front {
        margin: 20px;
    }
}
</style>
