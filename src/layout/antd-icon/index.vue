<template>
  <!-- <i :class="icon" aria-hidden="true"></i> -->
  <component :is="icon" twoToneColor="#eb2f96"></component>
  <!-- <icon :component="icon" /> -->
</template>

<script>
  import 'remixicon/fonts/remixicon.css'
  import { PoundCircleOutlined, ShopOutlined } from '@ant-design/icons-vue'

  export default {
    name: 'AntdIcon',
    props: {
      icon: {
        type: String,
        required: true,
      },
    },
    components: {
      PoundCircleOutlined,
      ShopOutlined,
    },
  }
</script>

<style lang="less" scoped>
  [class*='ri'] {
    font-size: 16px;
    vertical-align: -1px;
  }
</style>
