import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
// const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
// const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
import Index from '@/views/Index'
import Login from '@/views/login/login'
import Home from '@/views/home/home'
import PersonCenter from '@/views/personCenter/personCenter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Index,
      name: 'Index',
      children: [{
        path: '/Home',
        component: Home,
        name: 'Home'
      },
      {
        path: '/PersonCenter',
        component: PersonCenter,
        name: 'PersonCenter'
      }]
    }
  ]
})
