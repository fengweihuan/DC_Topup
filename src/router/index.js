import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '订单列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/tree',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '客户列表', icon: 'tree' }
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
        meta: { title: '系统用户', icon: 'form' }
      }
    ]
  },

  {
    path: '/operate',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Operate',
        component: () => import('@/views/operate/index'),
        meta: { title: '运营商', icon: 'form' }
      }
    ]
  }, 
    {
      path: '/coupon',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Coupon',
        component: () => import('@/views/coupon/index'),
        meta: { title: '优惠券', icon: 'form' }
      }
    ]
  },
  {
    path: '/deposit',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Deposit',
        component: () => import('@/views/deposit/index'),
        meta: { title: '提现申请', icon: 'form' }
      }
    ]
  },

  {
    path: '/configure',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Configure',
        component: () => import('@/views/configure/index'),
        meta: { title: '系统配置', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

