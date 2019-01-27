import {padZero} from '@/utilities/helpers'
import config from '@/config'
import format from 'date-fns/format'
import {find, create, update} from '@/database/sessions'

const today = format(new Date(), 'MM-DD-YYYY')

const state = {
  timer: null,
  isBreak: false,
  isSession: false,
  time: null,
  sessionDuration: config.get('pomodoro.sessionDuration') || 0.1,
  shortBreak: config.get('pomodoro.shortBreak') || 0.1,
  longBreak: config.get('pomodoro.longBreak') || 0.2,
  longBreakInterval: config.get('pomodoro.longBreakInterval') || 3,
  workSession: null,
  isWorkFinished: false,
  isUserClicked: false
}

const getters = {
  minutes: state => padZero(Math.floor(state.time / 60)),

  seconds: (state, getters) => padZero(state.time - (getters.minutes * 60)),

  isActive: state => !!state.timer,

  sessionCount: state => state.workSession ? state.workSession.data.length : null,

  sessions: state => state.workSession ? state.workSession.data : [],

  onBreak: state => state.isBreak,

  sessionFinished: state => state.isWorkFinished,

  isLongBreak: (state, getters) => getters.sessionCount % state.longBreakInterval === 0,

  isWorking: state => state.isSession,

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

  INCREMENT_WORK_SESSION (state, payload) {
    state.workSession.data.push(payload)
  },

  RESET (state) {
    state.time = state.sessionDuration * 60
    state.isSession = false
    state.isBreak = false

    clearInterval(state.timer)

    state.timer = null
  },

  TOGGLE_WORK (state, payload) {
    state.isSession = payload
  },

  TOGGLE_BREAK (state, payload) {
    state.isBreak = payload
  },

  SET_WORK_SESSION (state, payload) {
    state.workSession = payload
  },

  SET_FINISH (state, payload) {
    state.isWorkFinished = payload
  },

  SET_USER_CLICKED (state, payload) {
    state.isUserClicked = payload
  }
}

const actions = {
  init ({ commit, state, getters, dispatch }) {
    let timer = setInterval(() => {
      if (state.time > 1) {
        commit('DECREMENT_TOTAL_TIME')

        return
      }

      getters.onBreak ? dispatch('endBreak', false) : dispatch('endSession')
    }, 1000)

    commit('SET_TIMER', timer)
  },

  async endSession ({commit, state, dispatch, rootGetters}) {
    let data = {
      project: rootGetters['projects/current']._id,
      duration: state.sessionDuration
    }

    await update({ _id: state.workSession._id }, { $push: { data } })

    commit('RESET')

    commit('INCREMENT_WORK_SESSION', data)

    dispatch('projects/incrementSession', state.sessionDuration, { root: true })

    commit('SET_FINISH', true)
  },

  initSession ({ commit, state, dispatch }) {
    commit('SET_TOTAL_TIME', state.sessionDuration)

    commit('TOGGLE_WORK', true)
    commit('TOGGLE_BREAK', false)

    dispatch('init')
  },

  initBreak ({ commit, state, getters, dispatch }) {
    commit('SET_TOTAL_TIME', (getters.isLongBreak ? state.longBreak : state.shortBreak))

    commit('TOGGLE_WORK', false)
    commit('TOGGLE_BREAK', true)

    dispatch('init')
  },

  endBreak ({ commit }) {
    commit('TOGGLE_BREAK', false)

    commit('RESET')
  },

  async getTodayWorkSessionCount ({commit}) {
    let todaySessions = await find({ date: today })

    if (!todaySessions) {
      todaySessions = await create({ date: today, data: [] })
    }

    commit('SET_WORK_SESSION', todaySessions)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
