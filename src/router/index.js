import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/home/index'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/index', component: Home, meta: { title: '首页' } },
    { path: '/login', component: Login, meta: { title: '登录' } },
    { path: '*', redirect: '/index' },
];

const router = new VueRouter({
    routes
});

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.path)) {
    next()
  } else {
    const token = localStorage.getItem('screenToken')
    if (token && token.length) {
      next()
    } else {
      next('/')
    }
  }
})

export default router;
