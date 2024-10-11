import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/home/index'
import Index from '@/views/index'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home, meta: { title: '首页' } },
    { path: '/login', component: Login, meta: { title: '登录' } },
    { path: '*', redirect: '/' },
    { 
      path: '/home',
      component: Index,
      meta: { title: '详情' },
      children: [
        {
          path: 'summary',
          component:()=>import('@/views/hospital/summary')
        },
        {
          path: 'rank',
          component:()=>import('@/views/hospital/rank')
        },
        {
          path: 'doctor',
          component:()=>import('@/views/hospital/doctor')
        }
      ]
    },
];

const router = new VueRouter({
    routes
});

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else {
    const token = sessionStorage.getItem('screenToken')
    if (token && token.length) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router;
