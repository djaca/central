import {padZero} from '@/utilities/helpers'
import config from '@/config'
import db from '@/database'
import format from 'date-fns/format'

const today = format(new Date(), 'MM-DD-YYYY')

let sessionDuration = 0.1
// let sessionDuration = config.get('pomodoro.sessionDuration') || 25
let shortBreak = config.get('pomodoro.shortBreak') || 5
let longBreak = config.get('pomodoro.longBreak') || 15
let longBreakInterval = config.get('pomodoro.longBreakInterval') || 3

const state = {
  timer: null,
  isBreak: false,
  isSession: false,
  time: sessionDuration * 30,
  sessionDuration,
  shortBreak,
  longBreak,
  longBreakInterval,
  workSession: null,
  isWorkFinished: false,
  isUserClicked: false
}

const getters = {
  minutes: state => padZero(Math.floor(state.time / 60)),

  seconds: (state, getters) => padZero(state.time - (getters.minutes * 60)),

  isActive: state => !!state.timer,

  sessionCount: state => state.workSession ? state.workSession.data.length : null,

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

  endSession ({commit, state, rootGetters}) {
    let data = {
      project: rootGetters['projects/current'].name || 'Unspecified project',
      duration: state.sessionDuration
    }

    db.pomodoro.update({ _id: state.workSession._id }, { $push: { data } }, err => {
      if (err) {
        console.log(err)

        return
      }

      commit('RESET')

      commit('INCREMENT_WORK_SESSION', data)

      commit('SET_FINISH', true)
    })
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

  getTodayWorkSessionCount ({commit}) {
    db.pomodoro.findOne({ date: today }, (err, doc) => {
      if (err) {
        console.log(err)

        return
      }

      if (!doc) {
        db.pomodoro.insert({ date: today, data: [] }, (err, newDoc) => {
          if (err) {
            console.log(err)
            return
          }

          commit('SET_WORK_SESSION', newDoc)
        })

        return
      }

      commit('SET_WORK_SESSION', doc)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
