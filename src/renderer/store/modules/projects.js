import { create, getAll, remove, update } from '@/database/projects'

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
  async get ({commit}) {
    const data = await getAll()

    commit('SET_PROJECTS', data)
  },

  async add ({commit}, name) {
    const data = await create({name, createdAt: new Date()})

    commit('ADD', data)
  },

  async update ({commit}, payload) {
    await update({_id: payload.id}, {$set: {name: payload.name}})

    commit('UPDATE', payload)
  },

  async delete ({commit}, id) {
    await remove({_id: id})

    commit('DELETE', id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
