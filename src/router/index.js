import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import Login from '@/views/LoginView.vue'
import Home from '@/views/ResultView.vue'
import Edit from '@/views/FormulaeditorView.vue'
import Chat from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/edit', component: Edit, meta: { role: 11 } },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (!auth.isLoggedIn && to.path !== '/login') {
    next('/login')
    return
  }

  if (to.meta.role && auth.role !== to.meta.role) {
    next('/')
    return
  }

  next()
})

export default router
