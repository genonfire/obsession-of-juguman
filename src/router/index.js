import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'demo',
    component: () => import('@/components/Demo.vue')
  },
  {
    path: '/test',
    name: 'obsession',
    component: () => import('@/components/Obsession.vue')
  },
]

const router = new VueRouter({
  routes,
})

export default router
