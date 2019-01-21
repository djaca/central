import {padZero} from '@/utilities/helpers'

const state = {
  interval: null,
  date: new Date()
}

const getters = {
  hours: state => padZero(state.date.getHours()),

  minutes: state => padZero(state.date.getMinutes()),

  seconds: state => padZero(state.date.getSeconds()),

  date: state => state.date.toDateString()
}

const mutations = {
  'SET_DATE' (state) {
    state.date = new Date()
  },

  SET_INTERVAL (state, payload) {
    state.interval = payload
  }
}

const actions = {
  init ({commit}) {
    let interval = setInterval(() => {
      commit('SET_DATE')
    }, 1000)

    commit('SET_INTERVAL', interval)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
