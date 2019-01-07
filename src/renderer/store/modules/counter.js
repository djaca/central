const state = {
  words: 0,
  limit: 750,
  text: ''
}

const mutations = {
  setText (state, payload) {
    state.text = payload
  },

  SET_MAIN (state, payload) {
    state.words = payload
  }
}

const actions = {
  setCount ({commit}, payload) {
    commit('SET_MAIN', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
