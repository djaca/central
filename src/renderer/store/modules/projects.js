import db from '@/database'

const remoteProjects = db.projects

const state = {
  items: null,
  current: {}
}

const getters = {
  projects: state => state.items,

  current: state => state.current
}

const mutations = {
  SET_PROJECTS (state, payload) {
    state.items = payload
  },

  SET_CURRENT (state, id) {
    state.current = state.items.find(i => i._id === id)
  },

  ADD (state, payload) {
    state.items.push(payload)
  }
}

const actions = {
  get ({commit}) {
    remoteProjects.find({}, (err, docs) => {
      if (err) {
        console.log(err)

        return
      }

      commit('SET_PROJECTS', docs)
    })
  },

  add ({commit}, name) {
    let data = {name}

    remoteProjects.insert(data, (err, newDoc) => {
      if (err) {
        console.log(err)

        return
      }

      commit('ADD', newDoc)
    })
  },

  delete ({commit}, id) {
    console.log(id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
