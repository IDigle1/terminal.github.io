import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import fake_db from '../../fake_db/db'
import { 
  FETCH_PROVIDER, 
  FETCH_PROVIDERS, 
  REFILL_BALANCE 
} from './types/actions.types'

import { 
  SET_CURRENT_PROVIDER, 
  SET_PROVIDERS, 
  SET_RESPONSE, 
  SET_SUBMIT_STATUS 
} from './types/mutations.types'

export default new Vuex.Store({
  state: {
    providers: [],
    response: {},
    currentProvider: {},
    submitStatus: null
  },

  getters: {
    getProviders(state) {
      return state.providers;
    },

    getCurrentProvider(state) {
      return state.currentProvider;
    },

    getSubmitStatus(state) {
      return state.submitStatus;
    },
  },

  mutations: {
    [SET_RESPONSE](state, response) {
      state.response = response;
    },

    [SET_PROVIDERS](state, providers) {
      state.providers = providers;
    },

    [SET_CURRENT_PROVIDER](state, provider) {
      state.currentProvider = provider;
    },

    [SET_SUBMIT_STATUS](state, status) {
      state.submitStatus = status;
    },
  },

  actions: {
    async [REFILL_BALANCE](ctx, payload) {
      ctx.commit('setSubmitStatus', 'pending');
      const response = await fake_db.refillBalance(payload);
      
      if (response.status === 200) {
        ctx.commit('setResponse', response.data);
        ctx.commit('setSubmitStatus', 'ok');
      } else {
        ctx.commit('setSubmitStatus', 'error');
      }
    },

    async [FETCH_PROVIDERS](ctx) {
      const response = await fake_db.fetchProviders();

      if (response.status === 200) {
        ctx.commit('setProviders', response.data);
      }
    },

    async [FETCH_PROVIDER](ctx, code) {
      const response = await fake_db.fetchProvider(code);
      
      if (response.status === 200) {
        ctx.commit('setCurrentProvider', response.data);
      }
    },
  },

  modules: {}
})
