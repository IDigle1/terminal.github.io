import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import provider from './modules/provider.module'
import providersList from './modules/providersList.module'

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    provider,
    providersList
  }
})
