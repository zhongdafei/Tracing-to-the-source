import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index.vue";
import Login from "./views/login.vue";
import Register from "./views/Register.vue";
import NotFound from "./views/404.vue";
import Home from "./views/Home.vue";
import AddInfo from "./views/AddInfo.vue";
import InfoShow from "./views/InfoShow.vue";
import FundList from "./views/FundList.vue";


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/addinfo',
          name: 'addinfo',
          component: AddInfo
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/fundlist',
          name: 'fundlist',
          component: FundList
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    },
  
  ]
})
