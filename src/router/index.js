import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ArrangeView from '@/views/ArrangeView.vue'
import FileUploadView from '@/views/FileUploadView.vue'


const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      shovalues:true
    }
  },
  {
    path: '/arrange',
    name: 'arrange',
    component: ArrangeView,
    meta:{
      shovalues:true
    }
  },
  {
    path: '/fileUpload',
    name: 'fileUpload',
    component: FileUploadView,
    meta:{
      shovalues:true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta:{
      shovalues:true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router