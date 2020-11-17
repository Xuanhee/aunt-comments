<template>
  <div class="test-container">
    <a-alert message="动态路由测试"></a-alert>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router'
  export default {
    name: 'Test',
    setup() {
      const route = useRoute()
      console.log(route.params)
      console.log(route.query)
    },
  }
</script>
