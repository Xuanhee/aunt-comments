import Layout from '@/layout'

const AuntRouter = {
  path: '/aunt',
  component: Layout,
  redirect: '/aunt/aunt',
  meta: { title: '阿姨点评', icon: 'PoundCircleOutlined' },
  children: [
    {
      path: 'aunt',
      name: 'Aunt',
      component: () => import('@/views/aunt/Aunt.vue'),
      meta: { title: '阿姨点评', icon: 'PoundCircleOutlined' },
    },
    {
      path: '403',
      name: 'Error403',
      component: () => import('@/views/403'),
      meta: {
        title: '403',
        icon: 'ShopOutlined',
      },
    },
    {
      path: '404',
      name: 'Error404',
      component: () => import('@/views/404'),
      meta: {
        title: '404',
        icon: 'ShopOutlined',
      },
    },
  ],
}

export default AuntRouter
