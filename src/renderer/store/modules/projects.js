const state = {
  items: [
    {
      _id: 1,
      name: 'No project specified'
    },
    {
      _id: 2,
      name: 'central'
    },
    {
      _id: 3,
      name: 'tv-shows'
    },
    {
      _id: 4,
      name: 'goodwork'
    }
  ],
  current: {}
}

const getters = {
  current: state => state.current
}

const mutations = {
  TOGGLE (state, id) {
    if (state.current._id === id) {
      state.current = {}

      return
    }

    state.current = state.items.find(i => i._id === id)
  }
}

const actions = {
  //
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
