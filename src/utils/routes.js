import router from '@/router'
import path from 'path'
import { rolesControl } from '@/config'
import { isExternal } from '@/utils/validate'
import store from '@/store'

/**

 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function convertRouter(constantRoutes) {
  return constantRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        const path = 'layouts'
        route.component = (resolve) => require([`@/${path}`], resolve)
      } else {
        let path = 'views/' + route.component
        if (
          new RegExp('^/views/.*$').test(route.component) ||
          new RegExp('^views/.*$').test(route.component)
        ) {
          path = route.component
        } else if (new RegExp('^/.*$').test(route.component)) {
          path = 'views' + route.component
        } else if (new RegExp('^@views/.*$').test(route.component)) {
          path = route.component.slice(1)
        } else {
          path = 'views/' + route.component
        }
        route.component = (resolve) => require([`@/${path}`], resolve)
      }
    }
    if (route.children && route.children.length)
      route.children = convertRouter(route.children)

    if (route.children && route.children.length === 0) delete route.children

    return route
  })
}

/**

 * @description 根据roles数组拦截路由(动态路由)
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */
export function filterRoutes(routes, baseUrl = '/') {
  return routes
    .filter((route) => {
      if (route.meta && route.meta.roles) {
        return !rolesControl || hasRole(route.meta.roles)
      } else {
        return true
      }
    })
    .map((route) => {
      if (route.path !== '*' && !isExternal(route.path))
        route.path = path.resolve(baseUrl, route.path)
      route.fullPath = route.path
      if (route.children)
        route.children = filterRoutes(route.children, route.fullPath)
      return route
    })
}

// 处理权限函数
export function hasRole(value) {
  // admin表示全部权限
  if (store.getters['acl/admin']) return true
  if (value instanceof Array && value.length > 0)
    return can(store.getters['acl/role'], {
      role: value,
      mode: 'oneOf',
    })
  let mode = 'oneOf'
  if (Object.prototype.hasOwnProperty.call(value, 'mode')) mode = value['mode']
  let result = true
  if (Object.prototype.hasOwnProperty.call(value, 'role'))
    result =
      result && can(store.getters['acl/role'], { role: value['role'], mode })
  if (result && Object.prototype.hasOwnProperty.call(value, 'ability'))
    result =
      result &&
      can(store.getters['acl/ability'], {
        role: value['ability'],
        mode,
      })
  return result
}

export function can(roleOrAbility, value) {
  let hasRole = false
  if (
    value instanceof Object &&
    Object.prototype.hasOwnProperty.call(value, 'role') &&
    Object.prototype.hasOwnProperty.call(value, 'mode')
  ) {
    const { role, mode } = value
    console.log(role, mode)
    // 所有包含
    if (mode === 'allOf') {
      hasRole = role.every((item) => {
        return roleOrAbility.includes(item)
      })
    }
    // 其中一个包含
    if (mode === 'oneOf') {
      hasRole = role.some((item) => {
        return roleOrAbility.includes(item)
      })
    }
    // 没有包含
    if (mode === 'except') {
      hasRole = !role.some((item) => {
        return roleOrAbility.includes(item)
      })
    }
  }
  return hasRole
}

/**
 * 根据当前页面firstMenu
 * @returns {string}
 */
export function handleFirstMenu() {
  const firstMenu = router.currentRoute.matched[0].path
  if (firstMenu === '') return '/'
  return firstMenu
}
