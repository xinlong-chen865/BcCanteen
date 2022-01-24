import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  // 食堂详情
  {
    path: '/canteen-desc',
    component: Layout,
    redirect: '/canteen-desc/index',
    name: 'canteen-desc',
    meta: { title: '食堂详情', icon: 'el-icon-s-platform' },
    auth: ['admin'],
    children: [
      {
        path: 'index',
        name: 'canteen-desc',
        component: () => import('@/views/canteen-desc/index'),
        meta: { title: '食堂详情', icon: 'el-icon-s-platform' }
      }
    ]
  },
  // 订单管理
  {
    path: '/order-management',
    component: Layout,
    redirect: '/order-management/order-application',
    name: 'order-management',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    auth: ['admin'],
    children: [
      {
        path: 'order-application',
        name: 'order-application',
        component: () => import('@/views/order-application/index'),
        meta: { title: '订单申请查看', icon: 'table' }
      },
      {
        path: 'order-desc',
        name: 'order-desc',
        component: () => import('@/views/order-desc/index'),
        meta: { title: '订单详情查看', icon: 'tree' }
      }
    ]
  },
  // 预测查看
  {
    path: '/forecast-view',
    component: Layout,
    redirect: '/forecast-view/index',
    name: 'forecast-view',
    auth: ['admin'],
    meta: { title: '预测查看', icon: 'el-icon-view' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/table/index'),
        meta: { title: '预测查看', icon: 'el-icon-view' }
      }
    ]
  },
  // 统计分析
  {
    path: '/statistical-analysis',
    component: Layout,
    redirect: '/statistical-analysis/revenue-view',
    name: 'statistical-analysis',
    auth: ['admin'],
    meta: { title: '统计分析', icon: 'el-icon-edit' },
    children: [
      {
        path: 'revenue-view',
        name: 'revenue-view',
        component: () => import('@/views/revenue-view/index'),
        meta: { title: '收入查看', icon: 'table' }
      },
      {
        path: 'traffic-view',
        name: 'traffic-view',
        component: () => import('@/views/table/index'),
        meta: { title: '用户访问量查看', icon: 'table' }
      }
    ]
  },
  // 商家查看
  {
    path: '/merchant-management',
    component: Layout,
    redirect: '/merchant-management/dish-management',
    name: 'merchant-management',
    auth: ['superadmin'],
    meta: { title: '商家查看', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dish-management',
        name: 'dish-management',
        component: () => import('@/views/dish-management/index'),
        meta: { title: '菜品管理', icon: 'el-icon-food' }
      }
    ]
  },
  // 系统管理
  {
    path: '/system-management',
    component: Layout,
    redirect: '/system-management/user-management',
    name: 'system-management',
    auth: ['superadmin'],
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'user-management',
        name: 'user-management',
        component: () => import('@/views/user-management/index'),
        meta: { title: '用户管理', icon: 'table' }
      }, {
        path: 'auth-management',
        name: 'auth-management',
        component: () => import('@/views/auth-management/index'),
        meta: { title: '权限管理', icon: 'table' }
      }
    ]
  },
  // 店铺信息管理
  {
    path: '/store-information-management',
    component: Layout,
    redirect: '/store-information-management/audit-newuser',
    name: 'store-information-management',
    auth: ['superadmin'],
    meta: { title: '店铺信息管理', icon: 'el-icon-bell' },
    children: [
      {
        path: 'audit-newuser',
        name: 'audit-newuser',
        component: () => import('@/views/audit-newuser/index'),
        meta: { title: '审核新用户', icon: 'table' }
      }, {
        path: 'information-view',
        name: 'information-view',
        component: () => import('@/views/information-view/index'),
        meta: { title: '商家信息查看', icon: 'table' }
      }, {
        path: 'evaluation-view',
        name: 'evaluation-view',
        component: () => import('@/views/evaluation-view/index'),
        meta: { title: '评价查看', icon: 'table' }
      }
    ]
  },
  // 每日访问查看
  {
    path: '/daily-access',
    component: Layout,
    redirect: '/daily-access/purchase-statistics',
    name: 'daily-access',
    auth: ['superadmin'],
    meta: { title: '每日访问查看', icon: 'el-icon-mobile-phone' },
    children: [
      {
        path: 'purchase-statistics',
        name: 'purchase-statistics',
        component: () => import('@/views/purchase-statistics/index'),
        meta: { title: '购买统计查看', icon: 'table' }
      }, {
        path: 'traffic-analysis',
        name: 'traffic-analysis',
        component: () => import('@/views/traffic-analysis/index'),
        meta: { title: '访问量分析', icon: 'table' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
