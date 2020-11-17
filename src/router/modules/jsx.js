import Layout from '@/layout'

const JSX = {
  path: '/jsx',
  component: Layout,
  meta: { title: 'jsx', icon: 'PoundCircleOutlined' },
  redirect: '/jsx/jsx',
  children: [
    {
      path: 'jsx',
      name: 'AAA',
      component: () => import('@/views/jsx/parent.jsx'),
      meta: { title: 'jsx', icon: 'PoundCircleOutlined' },
    },
    {
      path: 'com',
      name: 'Com',
      component: () => import('@/views/jsx/component.jsx'),
      meta: { title: 'com', icon: 'PoundCircleOutlined' },
    },
  ],
}

export default JSX
