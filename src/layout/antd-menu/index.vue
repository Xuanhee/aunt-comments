<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length">
      <antd-menu
        v-for="route in item.children"
        :key="route.path"
        :item="route"
      ></antd-menu>
    </template>
  </component>
</template>

<script>
  import MenuItem from './components/MenuItem'
  import Submenu from './components/Submenu'
  export default {
    name: 'AntdMenu',
    components: { MenuItem, Submenu },
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        routeChildren: {},
        menuComponent: '',
      }
    },
    created() {
      const showChildren = this.handleChildren(this.item.children)
      if (showChildren.length === 0) {
        this.menuComponent = 'MenuItem'
        this.routeChildren = this.item
      } else if (showChildren.length === 1 && this.item.alwaysShow !== true) {
        this.menuComponent = 'MenuItem'
        this.routeChildren = showChildren[0]
      } else {
        this.menuComponent = 'Submenu'
      }
    },
    methods: {
      handleChildren(children = []) {
        if (children === null) return []
        return children.filter((item) => item.hidden !== true)
      },
    },
  }
</script>

<style lang="less" deepscoped>
  .ant-menu-item {
    display: flex;
    align-items: center;
    .anticon {
      font-size: 16px;
    }
    .title {
      font-size: 16px;
    }
  }
</style>
