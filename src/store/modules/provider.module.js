
import fake_db from '../../../fake_db/db'
import { FETCH_PROVIDER, REFILL_BALANCE } from '../types/actions.types'
import { SET_RESPONSE } from '../types/mutations.types'
import { 
    SET_CURRENT_PROVIDER,
    SET_SUBMIT_STATUS 
} from '../types/mutations.types'

const state = () => ({
    currentProvider: {},
    submitStatus: null,
    response: {},
})

const getters = {
    getCurrentProvider(state) {
        return state.currentProvider;
    },

    getSubmitStatus(state) {
        return state.submitStatus;
    },
}

const mutations = {
    [SET_CURRENT_PROVIDER](state, provider) {
        state.currentProvider = provider;
    },

    [SET_SUBMIT_STATUS](state, status) {
        state.submitStatus = status;
    },

    [SET_RESPONSE](state, response) {
        state.response = response;
    },
}

const actions = {
    async [FETCH_PROVIDER](ctx, code) {
        const response = await fake_db.fetchProvider(code);
        
        if (response.status === 200) {
            ctx.commit(SET_CURRENT_PROVIDER, response.data);
        }
    },

    async [REFILL_BALANCE](ctx, payload) {
        ctx.commit(SET_SUBMIT_STATUS, 'pending');
        const response = await fake_db.refillBalance(payload);
        
        if (response.status === 200) {
          ctx.commit(SET_RESPONSE, response.data);
          ctx.commit(SET_SUBMIT_STATUS, 'ok');
        } else {
          ctx.commit(SET_SUBMIT_STATUS, 'error');
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}