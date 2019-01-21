let workTime = (25 * 60)

const state = {
  timer: null,
  workTime,
  isBreak: false,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 3,
  workSession: 0
}

const getters = {
  minutes: state => padTime(Math.floor(state.workTime / 60)),

  seconds: (state, getters) => padTime(state.workTime - (getters.minutes * 60)),

  isActive: state => !!state.timer,

  workSession: state => state.workSession,

  onBreak: state => state.isBreak,

  isLongBreak: state => state.workSession % state.longBreakInterval === 0,

  breakDuration: (state, getters) => getters.isLongBreak ? state.longBreak : state.shortBreak
}

const mutations = {
  SET_TIMER (state, payload) {
    state.timer = payload
  },

  SET_TOTAL_TIME (state, payload) {
    state.workTime = payload
  },

  DECREMENT_TOTAL_TIME (state) {
    state.workTime--
  },

  INCREMENT_WORK_SESSION (state) {
    state.workSession++
  },

  RESET (state) {
    state.workTime = workTime

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
      if (state.workTime > 1) {
        commit('DECREMENT_TOTAL_TIME')

        return
      }

      getters.onBreak ? commit('TOGGLE_BREAK', false) : commit('INCREMENT_WORK_SESSION')

      commit('RESET')
    }, 1000)

    commit('SET_TIMER', timer)
  },

  initWorkSession ({ commit, dispatch }) {
    commit('TOGGLE_BREAK', false)

    dispatch('init')
  },

  initBreak ({ commit, state, getters, dispatch }) {
    commit('SET_TOTAL_TIME', (getters.isLongBreak ? state.longBreak : state.shortBreak) * 60)

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

function padTime (time) {
  return (time < 10 ? '0' : '') + time
}
