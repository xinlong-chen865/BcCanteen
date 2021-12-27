<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ nowTime }} {{ name }}同学，欢迎来到北城食堂管理平台</div>
    <el-row v-if="status !== 2">
      <el-col v-for="(item, index) in adminList" :key="index" :span="4" :offset="1">
        <el-card :body-style="{ padding: '0px' }" class="dashboard-container__card">
          <img :src="item.image" class="dashboard-container__image">
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="handleLink(item.link)">去查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col v-for="(item, index) in superAdminList" :key="index" :span="4" :offset="1">
        <el-card :body-style="{ padding: '0px' }" class="dashboard-container__card">
          <img :src="item.image" class="dashboard-container__image">
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="handleLink(item.link)">去查看</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

const CurryOne = require('@/assets/dashboard/curry_one.jpeg')
const DeluozanOne = require('@/assets/dashboard/deluozan_one.jpeg')
const JamesOne = require('@/assets/dashboard/james_one.jpeg')
const KobeOne = require('@/assets/dashboard/kobe_one.jpeg')
const LvingOne = require('@/assets/dashboard/lving_one.jpeg')
const LvingTwo = require('@/assets/dashboard/lving_two.jpeg')
const LvingThree = require('@/assets/dashboard/lving_three.jpeg')
const RoseOne = require('@/assets/dashboard/rose_one.jpeg')
const RusselOne = require('@/assets/dashboard/russel_one.jpeg')
const WadeOne = require('@/assets/dashboard/wade_one.jpeg')
const WubuleiOne = require('@/assets/dashboard/wubulei_one.jpeg')
const WubuleiTwo = require('@/assets/dashboard/wubulei_two.jpeg')
const zimugeOne = require('@/assets/dashboard/zimuge_one.jpeg')

export default {
  name: 'Dashboard',
  data() {
    return {
      adminList: [
        {
          title: '订单申请查看',
          image: CurryOne,
          link: '/order-management/order-application'
        },
        {
          title: '订单详情查看',
          image: DeluozanOne,
          link: '/order-management/order-desc'
        },
        {
          title: '预测查看',
          image: JamesOne,
          link: '/forecast-view/index'
        },
        {
          title: '收入查看',
          image: KobeOne,
          link: '/statistical-analysis/revenue-view'
        },
        {
          title: '用户访问量查看',
          image: LvingOne,
          link: '/statistical-analysis/traffic-view'
        }

      ],
      superAdminList: [
        {
          title: '菜品管理',
          image: LvingTwo,
          link: '/merchant-management/dish-management'
        },
        {
          title: '用户管理',
          image: LvingThree,
          link: '/system-management/user-management'
        },
        {
          title: '权限管理',
          image: RoseOne,
          link: '/system-management/auth-management'
        },
        {
          title: '审核新用户',
          image: RusselOne,
          link: '/store-information-management/audit-newuser'
        },
        {
          title: '商家信息查看',
          image: WadeOne,
          link: '/store-information-management/information-view'
        },
        {
          title: '购买统计查看',
          image: WubuleiTwo,
          link: '/daily-access/purchase-statistics'
        },
        {
          title: '访问量分析',
          image: zimugeOne,
          link: '/daily-access/traffic-analysis'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'status'
    ]),
    nowTime() {
      const curr = moment(new Date().getTime()).format('HH')
      if (curr < 12) {
        return '早上好!'
      } else if (curr === 12) {
        return '中午好！'
      } else if (curr > 12 && curr < 19) {
        return '下午好！'
      } else {
        return '晚上好！'
      }
    }
  },
  methods: {
    handleLink(link) {
      this.$router.push({ path: link })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    margin-right: 150px;
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
  &__card {
    margin: 30px 0px;
  }
  &__card:hover {
    cursor: pointer;
    box-shadow: inset -10px -10px 10px rgba(255, 255, 255, 0.9),
      inset 10px 10px 20px rgba(0, 0, 0, 0.05);
  }
  &__image {
    width: 100%;
  }
}
</style>
