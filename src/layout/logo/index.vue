<template>
  <div class="logo">
    <span class="anticon"></span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Logo',
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
      }),
    },
  }
</script>
<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    margin: 16px 5px;
    overflow: hidden;
    overflow: hidden;
    font-size: 15px;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
