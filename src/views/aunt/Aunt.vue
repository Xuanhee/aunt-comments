<template>
  <a-card>
    <div class="title">{{ title }}</div>
    <button @click="pushWithQuery({ id: 2 })">跳转</button>
    <input type="text" v-model="text" />
    <div>{{ text }}</div>
  </a-card>
</template>

<script>
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  export default {
    name: 'Aunt',
    setup(props, context) {
      const title = ref('阿姨点评')
      const text = ref('grgergre')
      const router = useRouter()
      const route = useRoute()
      console.log(route)
      console.log(context.$router)
      function pushWithQuery(query) {
        router.push({
          name: 'Test',
          params: query,
        })
        console.log(route.params)
        console.log(route.query)
      }
      watch(text, (newValue) => {
        console.log(newValue)
      })
      return {
        title,
        pushWithQuery,
        text,
      }
    },
  }
</script>

<style scoped>
  .title {
    font-size: 1rem;
  }
</style>
