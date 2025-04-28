import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import { ElMessage } from "element-plus";
import { useStore } from 'vuex';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  // {
  //   path: '/',
  //   redirect: '/login'
  // },//开发时用
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/order/manage',
    component: () => import('@/views/MainIndex.vue'),
    children: [
    {
      path: '/order/manage',
      name: 'countBar',
      component: () => import('@/components/contents/order/orderManage.vue')
    },
    {
      path: '/menu/dashMenu',
      name: 'dashMenu',
      component: () => import('@/components/contents/menu/dashMenu.vue')
    },
    {
      path: '/menu/dashType',
      name: 'dashType',
      component: () => import('@/components/contents/menu/dashType.vue')
    },
    {
      path: '/user/userComment',
      name: 'userComment',
      component: () => import('@/components/contents/user/userComment.vue')
    },
    {
      path: '/user/userInfo',
      name: 'userInfo',
      component: () => import('@/components/contents/user/userInfo.vue')
    },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const store = useStore();
  const user = store.getters.user;
  console.log(user);
  if (token && user.token !== '') {
  // if (token) {//开发时用
    // 用户已经登录
    if (to.name === 'login') {
      // 尝试访问登录页面，重定向到主页
      next({ name: 'index' });
      ElMessage({
        message: "用户已登录",
        type: "warning",
        duration: 2000,
      });
    } else {
      // 允许访问其他页面
      next();
    }
  } else {
    // 用户未登录
    if (to.name !== 'login') {
      // 尝试访问非登录页面，重定向到登录页面
      next({ name: 'login' });
      ElMessage({
        message: "未登录，请先登录",
        type: "error",
        duration: 2000,
      });
    } else {
      // 允许访问登录页面
      next();
    }
  }
})
export default router
