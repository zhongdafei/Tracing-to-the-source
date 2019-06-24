import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    items: [], // 已经加入购物车的物品
    xiadans:[],
    user: {
      avatar: '',
      tel:'',
      add:'',
      name:''
    }
  },
  getters: {
    items(state) {
      return state.items;
    },
    user(state) {
      return state.user;
    },
    xiadans(state){
      return state.xiadans;
    }
  },
  mutations: {//同步操作，修改状态，在组件中使用$store.commit('',params)
    addItem(state, item) {
      state.items.push(item);
    },
    buynow(state,item){
      state.xiadans.push(item)
    }
  },
  actions: {//异步操作,在组件中使用的是$store.dispath('',params)
    addItem(context, item) {
      context.commit('addItem', item);
    },
    buynow(context,item){
      context.commit('buynow',item);
    }
  }
});