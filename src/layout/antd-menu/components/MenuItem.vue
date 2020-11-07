<template>
  <a-menu-item :key="routeChildren.path" @click.capture="handleLink">
    <span class="anticon">
      <antd-icon :icon="routeChildren.meta.icon"></antd-icon>
    </span>
    <span class="title">{{ routeChildren.meta.title }}</span>
  </a-menu-item>
</template>

<script>
  import { isExternal } from '@/utils/validate'
  import AntdIcon from '@/layout/antd-icon'
  export default {
    name: 'MenuItem',
    components: { AntdIcon },
    props: {
      item: {
        type: Object,
        default() {
          return null
        },
      },
      routeChildren: {
        type: Object,
        default: () => null,
      },
    },
    methods: {
      handleLink() {
        const routePath = this.routeChildren.fullPath
        const target = this.routeChildren.meta.target
        if (target === '_blank') {
          if (isExternal(routePath)) window.open(routePath)
          else if (this.$route.path !== routePath) window.open(routePath.href)
        } else {
          if (isExternal(routePath)) window.location.href = routePath
          else if (this.$route.path !== routePath) this.$router.push(routePath)
        }
      },
    },
  }
</script>
