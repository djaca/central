import {padZero} from '@/utilities/helpers'
import config from '@/config'

let sessionDuration = config.get('pomodoro.sessionDuration') || 25
let shortBreak = config.get('pomodoro.shortBreak') || 5
let longBreak = config.get('pomodoro.longBreak') || 15
let longBreakInterval = config.get('pomodoro.longBreakInterval') || 3

const state = {
  timer: null,
  isBreak: false,
  time: sessionDuration * 60,
  sessionDuration,
  shortBreak,
  longBreak,
  longBreakInterval,
  sessionCount: 0
}

const getters = {
  minutes: state => padZero(Math.floor(state.time / 60)),

  seconds: (state, getters) => padZero(state.time - (getters.minutes * 60)),

  isActive: state => !!state.timer,

  sessionCount: state => state.sessionCount,

  onBreak: state => state.isBreak,

  isLongBreak: state => state.sessionCount % state.longBreakInterval === 0,

  breakDuration: (state, getters) => getters.isLongBreak ? state.longBreak : state.shortBreak
}

const mutations = {
  SET (state, { sessionDuration, shortBreak, longBreak, longBreakInterval }) {
    config.set('pomodoro', { sessionDuration, shortBreak, longBreak, longBreakInterval })

    state.sessionDuration = sessionDuration
    state.shortBreak = shortBreak
    state.longBreak = longBreak
    state.longBreakInterval = longBreakInterval
  },

  SET_TIMER (state, payload) {
    state.timer = payload
  },

  SET_TOTAL_TIME (state, payload) {
    state.time = payload * 60
  },

  DECREMENT_TOTAL_TIME (state) {
    state.time--
  },

  INCREMENT_WORK_SESSION (state) {
    state.sessionCount++
  },

  RESET (state) {
    state.time = state.sessionDuration * 60

    clearInterval(state.timer)

    state.timer = null
  },

  TOGGLE_BREAK (state, payload) {
    state.isBreak = payload
  }
}

const actions = {
  init ({ commit, state, getters }) {
    let timer = setInterval(() => {
      if (state.time > 1) {
        commit('DECREMENT_TOTAL_TIME')

        return
      }

      getters.onBreak ? commit('TOGGLE_BREAK', false) : commit('INCREMENT_WORK_SESSION')

      commit('RESET')
    }, 1000)

    commit('SET_TIMER', timer)
  },

  initWorkSession ({ commit, state, dispatch }) {
    commit('SET_TOTAL_TIME', state.sessionDuration)

    commit('TOGGLE_BREAK', false)

    dispatch('init')
  },

  initBreak ({ commit, state, getters, dispatch }) {
    commit('SET_TOTAL_TIME', (getters.isLongBreak ? state.longBreak : state.shortBreak))

    commit('TOGGLE_BREAK', true)

    dispatch('init')
  },

  endBreak ({ commit }) {
    commit('TOGGLE_BREAK', false)

    commit('RESET')
  },

  forfeit ({commit}) {
    commit('RESET')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
