import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import Register from "./views/Register.vue";
import login from "./views/login.vue";
import NotFound from "./views/404.vue";
import Home from "./views/Home.vue";
import Infoshow from "./views/infoshow.vue";
// import FundList from "./views/FundList.vue";
// import ShopCar from "./views/shopcar.vue";
import Order from "./views/order.vue";

Vue.use(Router);

var router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/index",
      name: "index",
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
          path: '/infoshow',
          name: 'infoshow',
          component: Infoshow
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        },
      ]
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "*",
      name: "/404",
      component: NotFound
    }
  ]
});
// 路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.eleToken ? true:false;
  if(to.path=='/login' || to.path=='/register'){
    next();
  }else{
    isLogin ? next():next('/login');
  }
})
export default router;