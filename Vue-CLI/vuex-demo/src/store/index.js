import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
    incrementOdd(context, value) {
        if (context.state.sum % 2) context.commit('INCREMENT', value)
    },
    incrementWait(context, value) {
        setTimeout(() => {
            context.commit('INCREMENT', value)
        }, 500)
    }
}

const mutations = {
    INCREMENT(state, value) {
        state.sum += value
    },
    DECREMENT(state, value) {
        state.sum -= value
    }
}

const state = {
    sum: 0
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})