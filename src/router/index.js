import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/inde-x.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/inde-x.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/Category/inde-x.vue')
  },
  {
    path: '/category-detail/:categoryId',
    name: 'category-detail',
    component: () => import('@/views/CategoryDetail/inde-x.vue'),
    props: true
  },
  {
    path: '/order-confirm',
    name: 'order-confirm',
    component: () => import('@/views/OrderConfirm/inde-x.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/inde-x.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/order-detail/:orderId',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail/inde-x.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/inde-x.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('@/views/Product/inde-x.vue'),
    props: true
  },
  {
    path: '/comment/:productId',
    name: 'comment',
    component: () => import('@/views/Comment/inde-x.vue'),
    props: true
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend/inde-x.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/index-cart.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/inde-x.vue'),
    props: true
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/inde-x.vue'),
    props: true,
    meta: { requireAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound/inde-x.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
import store from '@/store/index'
router.beforeEach(to => {
  if (!to.meta.requireAuth) {
    return true
  }
  if (!store.state.user || !window.localStorage.getItem('USER_TOKEN')) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})


export default router
