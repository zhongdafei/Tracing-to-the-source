import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
  },
  getters:{
    items(state){
      return state.items;
    },
  },
  mutations: {
    addItem(state,item){
      state.items.push(item);
    }
  },
  actions: {
    additem(context,item){
      context.commit('addItem',item);
    }
  }
})
