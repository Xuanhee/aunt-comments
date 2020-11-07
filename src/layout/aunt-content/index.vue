<template>
  <a-layout-content class="content">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-layout-content>
</template>

<script>
  export default {
    name: 'Content',
    watch: {
      $route: {
        handler() {
          if ('mobile' === this.device) {
            this.$store.dispatch('settings/foldSideBar')
          }
        },
        immediate: true,
      },
    },
  }
</script>

<style lang="less">
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.2s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .aunt-content {
    min-height: calc(
      100vh - @header-height - @default-padding - @default-padding -
        @default-padding - @default-padding
    ) !important;
    padding: @default-padding;
    margin: @default-margin;
    background: #fff;
    .error-container {
      height: calc(
        100vh - @header-height - @default-padding - @default-padding -
          @default-padding - @default-padding - @default-padding -
          @default-margin
      ) !important;
    }
  }
</style>
