<template>
  <a-layout class="layout-wrap" id="components-layout-demo-responsive">
    <div
      v-if="device === 'mobile' && !collapse"
      class="mask"
      @click="handleFoldSideBar"
    ></div>
    <a-layout-sider
      collapsible
      class="sider"
      width="215"
      v-model:collapsed="collapse"
      :class="classObj"
      :trigger="null"
      breakpoint="lg"
    >
      <logo />
      <a-menu
        class="menu"
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
      >
        <antd-menu v-for="route in routes" :key="route.path" :item="route" />
      </a-menu>
    </a-layout-sider>
    <a-layout
      class="layout"
      :class="'mobile' === device ? 'mobile-layout' : ''"
    >
      <a-layout-header class="header">
        <a-row>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <menu-unfold-outlined
              v-if="collapse"
              class="trigger"
              @click="toggleCollapse"
            />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="toggleCollapse"
            />
          </a-col>
          <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <avatar />
          </a-col>
        </a-row>
      </a-layout-header>
      <tabs />
      <aunt-content />
    </a-layout>
  </a-layout>
</template>
<script>
  import Logo from './logo'
  import Avatar from './avatar'
  import AntdMenu from './antd-menu'
  import Tabs from './tabs'
  import AuntContent from './aunt-content'
  import { mapActions, mapGetters } from 'vuex'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

  export default {
    components: {
      Logo,
      Avatar,
      Tabs,
      AntdMenu,
      AuntContent,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
    },
    data() {
      return {
        selectedKeys: [],
        openKeys: [],
      }
    },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
        routes: 'routes/routes',
        device: 'settings/device',
      }),
      classObj() {
        return {
          mobile: this.device === 'mobile',
          collapse: this.collapse,
        }
      },
    },
    watch: {
      $route: {
        handler({ path, matched }) {
          matched[0].children.length > 1
            ? (this.selectedKeys = [path])
            : (this.selectedKeys = [matched[0].path])
          this.openKeys = [matched[0].path]
        },
        immediate: true,
      },
    },
    beforeMount() {
      window.addEventListener('resize', this.handleLayouts)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleLayouts)
    },
    mounted() {
      this.handleLayouts()
    },
    methods: {
      ...mapActions({
        toggleDevice: 'settings/toggleDevice',
        handleFoldSideBar: 'settings/foldSideBar',
        toggleCollapse: 'settings/toggleCollapse',
      }),
      handleLayouts() {
        const width = document.body.getBoundingClientRect().width
        if (this.width !== width) {
          const isMobile = width - 1 < 992
          this.toggleDevice(isMobile ? 'mobile' : 'desktop')
          this.width = width
        }
      },
      onBreakpoint(broken) {
        console.log(broken)
      },
    },
  }
</script>
<style lang="less">
  .layout-wrap {
    .sider {
      position: fixed;
      left: 0;
      height: 100vh;
      overflow: auto;
      .menu {
        height: calc(100vh - @header-height);
        .ant-menu-submenu-title {
          display: flex;
          align-items: center;
          span {
            font-size: 16px;
          }
        }
      }
    }
    .layout {
      padding-left: 215px;
      transition: all 0.2s;
    }
    .mobile-layout {
      padding-left: 0;
      transition: all 0.2s;
    }
    .collapse {
      .logo .anticon + span {
        display: inline-block;
        max-width: 0;
        opacity: 0;
        transition: all 0.2s;
      }
      & + .layout {
        padding-left: 81px;
        transition: all 0.2s;
      }
    }
    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 998;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }
    .mobile {
      position: fixed !important;
      z-index: 999;
      &.collapse {
        width: 0 !important;
        min-width: 0 !important;
        max-width: 0 !important;
        * {
          display: none !important;
          width: 0 !important;
          min-width: 0 !important;
          max-width: 0 !important;
        }
        .ant-menu-item,
        .ant-menu-submenu {
          display: none !important;
          width: 0 !important;
          min-width: 0 !important;
          max-width: 0 !important;
        }
        & + .layout {
          padding-left: 0px !important;
          transition: all 0.2s;
        }
      }
    }
    .header {
      padding: 0;
      background: #fff;
      .ant-col + .ant-col {
        display: flex;
        justify-content: flex-end;
        padding: 0 @default-padding;
      }
      .trigger {
        height: @header-height;
        padding: 0 @default-padding;
        font-size: 18px;
        line-height: @header-height;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
</style>
