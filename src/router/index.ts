import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import { ElMessage } from "element-plus";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/MainIndex.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 判断token存不存在
  const token = localStorage.getItem('token')
  // token不存在，说明当前用户是未登录，应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
    ElMessage({
      message: "未登录，请先登录",
      type: "error",
      duration: 2000,
    });
  } else if (token && to.name === 'login') {  //token存在，说明用户已经登录了
    next({ name: 'index' })
    ElMessage({
      message: "已登录",
      type: "warning",
      duration: 2000,
    });
  } else {
    next()
  }
})
export default router
