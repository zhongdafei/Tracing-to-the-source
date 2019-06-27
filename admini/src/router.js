import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register'
import Nofind from './views/404'
import Login from './views/Login'
// import Home from './views/Home'
import InfoShow from './views/InfoShow'
import AddInfo from './views/AddInfo'
import AddGoods from './views/AddGoods'
import DoneUpGoods from './views/DoneUpGoods'
import Query from './views/Query'
import QueryAllInfo from './views/QueryAllInfo'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: '/404',
      component: Nofind
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          component: Query
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/addinfo',
          name: 'addinfo',
          component: AddInfo
        },
        {
          path: '/addgoods',
          name: 'addgoods',
          component: AddGoods
        },
        {
          path: '/doneupgoods',
          name: 'doneupgoods',
          component: DoneUpGoods
        },
        {
          path: '/query',
          name: 'query',
          component: Query
        },
        {
          path: '/queryallinfo',
          name: 'queryallinfo',
          component: QueryAllInfo
        }
      ]
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;