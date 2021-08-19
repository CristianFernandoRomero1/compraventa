import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state:{
        token:""
    },
    mutations:{
        setToken(state, value){
            state.token = value;
        }
    },
    actions:{
        setToken(context, value){
            context.commit("setToken",value)
        }
    }
})