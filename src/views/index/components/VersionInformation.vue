<template>
  <a-card>
    <a-alert :message="dependencies['vue']" type="success" show-icon />
  </a-card>
</template>
<script>
  import { dependencies, devDependencies } from '*/package.json'

  export default {
    data() {
      return {
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        dependencies: dependencies,
        devDependencies: devDependencies,
      }
    },
  }
</script>
<style lang="less" scoped>
  .version-information {
    margin-top: @default-margin;
    &-table {
      width: 100%;
      overflow: scroll;
      table {
        width: 100%;
        color: #666;
        border-collapse: collapse;
        background-color: #fff;

        td {
          position: relative;
          padding: 9px 15px;
          font-size: 14px;
          line-height: 20px;
          border: 1px solid #e6e6e6;

          &:nth-child(odd) {
            width: 20%;
            text-align: right;
            background-color: #f7f7f7;
          }
        }
      }
    }
  }
</style>
