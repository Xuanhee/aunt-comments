import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import asyncRouter from './modules'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'ShopOutlined',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'ShopOutlined',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/test',
    meta: {
      title: '动态路由测试',
      icon: 'ShopOutlined',
    },
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test'),
        meta: {
          title: '动态路由测试',
          icon: 'ShopOutlined',
        },
      },
    ],
  },
  {
    path: '/aa',
    component: Layout,
    redirect: '/aa/test',
    meta: {
      title: '动态路由测试',
      icon: 'ShopOutlined',
    },
    children: [
      {
        path: 'test',
        name: 'AA',
        component: () => import('@/views/test'),
        meta: {
          title: '动态路由测试',
          icon: 'ShopOutlined',
        },
      },
    ],
  },
  {
    path: '/bb',
    component: Layout,
    meta: {
      title: '动态路由测试',
      icon: 'ShopOutlined',
    },
    children: [
      {
        path: '/bb/test',
        name: 'BB',
        component: () => import('@/views/test'),
        meta: {
          title: '动态路由测试',
          icon: 'ShopOutlined',
        },
      },
    ],
  },
  {
    path: '/cc',
    component: Layout,
    meta: {
      title: '动态路由测试',
      icon: 'ShopOutlined',
    },
    children: [
      {
        path: '/cc/test',
        name: 'CC',
        component: () => import('@/views/test'),
        meta: {
          title: '动态路由测试',
          icon: 'ShopOutlined',
        },
      },
    ],
  },
  {
    path: '/dd',
    component: Layout,
    meta: {
      title: '动态路由测试',
      icon: 'ShopOutlined',
    },
    children: [
      {
        path: '/dd/test',
        name: 'DD',
        component: () => import('@/views/test'),
        meta: {
          title: '动态路由测试',
          icon: 'ShopOutlined',
        },
      },
    ],
  },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
]
export const asyncRoutes = [...routes, ...asyncRouter]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
