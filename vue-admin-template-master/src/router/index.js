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

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
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
    children: [
      {
        path: 'order-application',
        name: 'order-application',
        component: () => import('@/views/table/index'),
        meta: { title: '订单申请查看', icon: 'table' }
      },
      {
        path: 'order-desc',
        name: 'order-desc',
        component: () => import('@/views/tree/index'),
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
    meta: { title: '统计分析', icon: 'el-icon-edit' },
    children: [
      {
        path: 'revenue-view',
        name: 'revenue-view',
        component: () => import('@/views/table/index'),
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
    meta: { title: '商家查看', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dish-management',
        name: 'dish-management',
        component: () => import('@/views/table/index'),
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
    meta: { title: '每日访问查看', icon: 'el-icon-mobile-phone' },
    children: [
      {
        path: 'purchase-statistics',
        name: 'purchase-statistics',
        component: () => import('@/views/table/index'),
        meta: { title: '购买统计查看', icon: 'table' }
      }, {
        path: 'traffic-analysis',
        name: 'traffic-analysis',
        component: () => import('@/views/table/index'),
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
