import db from '@/database'

const remoteProjects = db.projects

const state = {
  items: null,
  currentId: null
}

const getters = {
  projects: state => state.items ? [...state.items].sort((a, b) => b.createdAt - a.createdAt) : [],

  current: state => state.currentId ? state.items.find(i => i._id === state.currentId) : {}
}

const mutations = {
  SET_PROJECTS (state, payload) {
    state.items = payload
  },

  SET_CURRENT (state, id) {
    state.currentId = id
  },

  ADD (state, payload) {
    state.items.push(payload)
  },

  UPDATE (state, payload) {
    state.items.find(i => i._id === payload.id).name = payload.name
  },

  DELETE (state, id) {
    state.items.splice(state.items.findIndex(i => i._id === id), 1)

    // Unselect project
    if (state.currentId === id) {
      state.currentId = null
    }
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
    let data = {
      name,
      createdAt: new Date()
    }

    remoteProjects.insert(data, (err, newDoc) => {
      if (err) {
        console.log(err)

        return
      }

      commit('ADD', newDoc)
    })
  },

  update ({commit}, payload) {
    remoteProjects.update({ _id: payload.id }, { $set: { name: payload.name } }, err => {
      if (err) {
        console.log(err)
      }

      commit('UPDATE', payload)
    })
  },

  delete ({commit}, id) {
    remoteProjects.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        console.log(err)

        return
      }

      commit('DELETE', id)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
