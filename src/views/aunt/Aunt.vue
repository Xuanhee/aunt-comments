<template>
  <a-card>
    <div class="title">{{ title }}</div>
  </a-card>
</template>

<script>
  import { ref } from 'vue'
  export default {
    name: 'Aunt',
    setup() {
      const title = ref('阿姨点评')
      return {
        title,
      }
    },
  }
</script>

<style scoped>
  .title {
    font-size: 1rem;
  }
</style>
