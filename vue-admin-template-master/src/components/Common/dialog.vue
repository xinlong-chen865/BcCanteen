<template>
  <el-dialog
    :title="title"
    :visible="visible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 用户管理 -->
      <el-form-item v-if="form.hasOwnProperty('stu_id')" label="学生号">
        <el-input v-model="form.stu_id" :disabled="form.isUpdate" :maxlength="11" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('username')" label="学生姓名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('sex')" label="学生性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男/man</el-radio>
          <el-radio :label="0">女/woman</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 商家信息查看 -->
      <el-form-item v-if="form.hasOwnProperty('floor_id')" label="层数">
        <el-radio-group v-model="form.floor_id">
          <el-radio :label="1000">一层</el-radio>
          <el-radio :label="2000">二层</el-radio>
          <el-radio :label="3000">三层</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('category_id')" label="商家种类">
        <el-radio-group v-model="form.category_id">
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
      <el-form-item v-if="form.hasOwnProperty('bus_name')" label="商家名称">
        <el-input v-model="form.bus_name" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('bus_phone')" label="负责人手机号">
        <el-input v-model="form.bus_phone" :maxlength="11" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('bus_people')" label="负责人姓名">
        <el-input v-model="form.bus_people" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('bus_address')" label="商家地址">
        <el-input v-model="form.bus_address" />
      </el-form-item>

      <el-form-item v-if="form.hasOwnProperty('eval_content')" label="用户评论">
        <el-input
          v-model="form.eval_content"
          type="textarea"
          :rows="5"
          disabled
        />
      </el-form-item>

      <!-- 菜品管理 -->
      <el-form-item v-if="form.hasOwnProperty('goods_name')" label="菜品名称">
        <el-input v-model="form.goods_name" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('price')" label="菜品单价">
        <el-input-number v-model="form.price" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('goods_total')" label="菜品销量">
        <el-input-number v-model="form.goods_total" />
      </el-form-item>

      <!-- 商家画像 -->
      <el-form-item v-if="form.hasOwnProperty('vector_price')" label="价格实惠">
        <el-rate v-model="form.vector_price" style="transform: translateY(10px);" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('vector_category')" label="种类丰富">
        <el-rate v-model="form.vector_category" style="transform: translateY(10px);" />
      </el-form-item>
      <el-form-item v-if="form.hasOwnProperty('vector_taste')" label="味道极佳">
        <el-rate v-model="form.vector_taste" style="transform: translateY(10px);" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    remoteClose: {
      type: Function,
      default: () => {}
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleClose() {
      this.remoteClose()
    },
    handleSubmit() {
      if (this.form.isUpdate) {
        this.$emit('handle-update')
      } else {
        this.$emit('handle-submit')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

