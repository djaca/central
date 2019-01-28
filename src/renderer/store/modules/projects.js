import { create, getAll, remove, update } from '@/database/projects'
import {sec2time} from '@/utilities/helpers'
import Vue from 'vue'

const state = {
  items: [],
  currentId: null,
  unspecified: {}
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

  current: state => state.currentId ? state.items.find(i => i._id === state.currentId) : {},

  unspecified: state => state.unspecified
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
    let index = state.items.findIndex(i => i._id === payload.id)

    Vue.set(
      state.items,
      index,
      {...state.items[index], ...payload.data}
    )
  },

  DELETE (state, id) {
    state.items.splice(state.items.findIndex(i => i._id === id), 1)

    if (state.currentId === id) {
      state.currentId = state.unspecified._id
    }
  },

  INCREMENT_SESSION (state, duration) {
    let i = state.items.find(i => i._id === state.currentId)

    i.sessions++

    i.time += duration
  },

  SET_UNSPECIFIED (state, payload) {
    state.unspecified = payload
  }
}

const actions = {
  async get ({commit, dispatch}) {
    let projects = await getAll()

    commit('SET_PROJECTS', projects)

    dispatch('handleUnspecifiedProject')
  },

  async handleUnspecifiedProject ({commit, state, dispatch}) {
    if (state.items.length < 1) {
      await dispatch('add', 'Unspecified project')
    }

    const unspecifiedProject = state.items.find(d => d.name === 'Unspecified project')

    commit('SET_UNSPECIFIED', unspecifiedProject)

    commit('SET_CURRENT', unspecifiedProject._id)
  },

  async add ({commit}, name) {
    const data = await create({name, createdAt: new Date(), sessions: 0, time: 0})

    commit('ADD', data)
  },

  async update ({commit}, payload) {
    await update({_id: payload.id}, {$set: payload.data})

    commit('UPDATE', payload)
  },

  async delete ({commit, state, dispatch}, id) {
    let deletedProject = state.items.find(i => i._id === id)

    let data = {
      sessions: state.unspecified.sessions + deletedProject.sessions,
      time: state.unspecified.time + deletedProject.time
    }

    dispatch('update', {id: state.unspecified._id, data})

    await remove({_id: id})
    commit('DELETE', id)
  },

  async incrementSession ({commit, state, getters, dispatch}, duration) {
    duration *= 60 // store in seconds

    let data = {
      sessions: getters.current.sessions + 1,
      time: getters.current.time + duration
    }

    dispatch('update', {id: state.currentId, data})

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
