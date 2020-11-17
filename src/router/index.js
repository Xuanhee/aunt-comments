/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到
 * hidden:true                    是否显示在菜单中显示路由（默认值：false）
 * alwaysShow:true                当只有一级子路由时是否显示父路由是否显示在菜单中显示路由（默认值：false）
 * name:"Demo"                    首字母大写，一定要与vue文件的name对应起来，用于noKeepAlive缓存控制（该项特别重要）
 * meta:{
    title:"title"                 菜单、面包屑、多标签页显示的名称
    roles:["admin","..."]         当config/index.js中rolesControl配置开启时，用于控制角色
    roles: {
      role: ["admin"],
      ability: ["READ","WRITE","DELETE"],         ability: ["READ","WRITE"],
      mode: "allOf"              allOf: 数组内所有角色都拥有，返回True oneOf: 数组内拥有任一角色，返回True(等价第1种数据) except: 不拥有数组内任一角色，返回True(取反)
    }
    icon:""                       antD图标组件
    isCustomSvgIcon:false,        是否是自定义svg图标（默认值：false，如果设置true，那么需要把你的svg拷贝到icon/remixIcon下，然后remixIcon字段配置上你的图标名）
    noKeepAlive:true              当前路由是否不缓存（默认值：false）
    affix:true                    当前路由是否固定多标签页
    badge:"New"                   badge小标签（只支持子级）
    tagHidden:true                当前路由是否不显示多标签页
   }
 */

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
