<template>
  <a-sub-menu :key="item.fullPath">
    <template v-slot:title>
      <span class="anticon">
        <antd-icon :icon="item.meta.icon"></antd-icon>
      </span>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script>
  import AntdIcon from '@/layout/antd-icon'
  export default {
    name: 'Submenu',
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
        default() {
          return null
        },
      },
    },
    methods: {},
  }
</script>
