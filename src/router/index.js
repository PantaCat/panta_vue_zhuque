import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HelloView from '@/views/HelloWordView.vue'
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
    path: '/hello',
    name: 'hello',
    component: HelloView,
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router