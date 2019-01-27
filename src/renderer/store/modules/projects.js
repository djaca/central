import { create, getAll, remove, update } from '@/database/projects'
import {sec2time} from '@/utilities/helpers'

const state = {
  items: null,
  currentId: null
}

const getters = {
  projects: state => {
    return state.items
      ? [...state.items].sort((a, b) => b.createdAt - a.createdAt).map(i => {
        return {
          ...i,
          time: sec2time(i.time)
        }
      })
      : []
  },

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
  },

  INCREMENT_SESSION (state, duration) {
    let i = state.items.find(i => i._id === state.currentId)

    i.sessions++

    i.time += duration
  }
}

const actions = {
  async get ({commit}) {
    const data = await getAll()

    commit('SET_PROJECTS', data)
  },

  async add ({commit}, name) {
    const data = await create({name, createdAt: new Date(), sessions: 0, time: 0})

    commit('ADD', data)
  },

  async update ({commit}, payload) {
    await update({_id: payload.id}, {$set: {name: payload.name}})

    commit('UPDATE', payload)
  },

  async delete ({commit}, id) {
    await remove({_id: id})

    commit('DELETE', id)
  },

  async incrementSession ({commit, state, getters, dispatch}, duration) {
    duration *= 60 // store in seconds

    let data = {
      sessions: getters.current.sessions + 1,
      time: getters.current.time + duration
    }

    await update({ _id: state.currentId }, {$set: data})

    commit('INCREMENT_SESSION', duration)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
