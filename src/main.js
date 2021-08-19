import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
/* import store from './store/store.js' */

import Vuex from 'vuex';
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Homepage from './components/homepage/Homepage.vue'
import Category from './components/warehouse/Category.vue'
import Articles from './components/warehouse/Articles.vue'
import Ingresos from './components/purchases/Income.vue'
import Proveedor from './components/purchases/Vendors.vue'
import Ventas from './components/sales/Sales.vue'
import Clientes from './components/sales/Customers.vue'
import Usuarios from './components/access/Users.vue'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:5000/api/'
//axios.defaults.baseURL='https://gigat-backend-base.herokuapp.com/api/'



Vue.use(VueRouter)
/* Vue.use(Vuex) */
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/homepage', component: Homepage },
  { path: '/categorias', component: Category },
  { path: '/articulos', component: Articles },
  { path: '/ingreso', component: Ingresos },
  { path: '/proveedor', component: Proveedor },
  { path: '/venta', component: Ventas },
  { path: '/cliente', component: Clientes },
  { path: '/usuario', component: Usuarios },
]
const router = new VueRouter({
  mode:'history',
  routes // short for `routes: routes`
});
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: null,
    usuario: null

  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },

  actions: {
    guardarToken({commit}, data){
      console.log("data")
      console.log(data.token)
      commit("setToken", data.token)
      commit("setUsuario", data.usuario)
      localStorage.setItem("token", data.token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        //commit("setUsuario", decode(token));
      }
      router.push("/");
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push("/login");
    }

  },
  modules: {
  }
});
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

