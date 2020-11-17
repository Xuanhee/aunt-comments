/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import {
  authentication,
  loginInterception,
  recordRoute,
  routesWhiteList,
} from '@/config'

// 拦截
router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters['user/accessToken']

  if (!loginInterception) hasToken = true

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 根据权限配置路由,这里逻辑需要根据项目情况来
      const hasRoles =
        store.getters['acl/admin'] ||
        store.getters['acl/role'].length > 0 ||
        store.getters['acl/ability'].length > 0
      console.log(store.getters['acl/role'], 666)
      if (hasRoles) {
        next()
      } else {
        try {
          if (loginInterception) {
            await store.dispatch('user/getUserInfo')
          } else {
            //loginInterception为false（关闭登录拦截时）时，创建虚拟角色
            await store.dispatch('user/setVirtualRoles')
          }
          let accessRoutes = []
          // 前端配置路由方式
          if (authentication === 'intelligence') {
            // 这一步是筛选动态路由 ***
            accessRoutes = await store.dispatch('routes/setRoutes')
          } else if (authentication === 'all') {
            // 后端配置路由方式（需要调接口）
            accessRoutes = await store.dispatch('routes/setAllRoutes')
          }
          accessRoutes.forEach((item) => {
            router.addRoute(item)
          })
          next({ ...to, replace: true })
        } catch {
          await store.dispatch('user/resetAll')
          if (recordRoute)
            next({
              path: '/login',
              query: { redirect: to.path },
              replace: true,
            })
          else next({ path: '/login', replace: true })
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (recordRoute)
        next({ path: '/login', query: { redirect: to.path }, replace: true })
      else next({ path: '/login', replace: true })
    }
  }
})
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title)
})
