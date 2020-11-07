import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import App from './App'
import router from './router'
import store from './store'
import '@/project'
// 解决touchstart警告
import 'default-passive-events'

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

createApp(App).use(store).use(router).use(Antd).mount('#app')
