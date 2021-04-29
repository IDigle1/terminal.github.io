
import fake_db from '../../../fake_db/db'
import { FETCH_PROVIDERS } from '../types/actions.types'
import { SET_PROVIDERS } from '../types/mutations.types'

const state = () => ({
    providers: [],
})

const getters = {
    getProviders(state) {
        return state.providers;
    },
}

const mutations = {
    [SET_PROVIDERS](state, providers) {
        state.providers = providers;
    },
}

const actions = {
    async [FETCH_PROVIDERS](ctx) {
        const response = await fake_db.fetchProviders();
  
        if (response.status === 200) {
          ctx.commit('setProviders', response.data);
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}