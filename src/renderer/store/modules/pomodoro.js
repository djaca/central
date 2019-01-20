let tempTime = (0.1 * 60)

const state = {
  timer: null,
  totalTime: tempTime,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 3,
  workSession: 0,
  resetButton: false
}

const getters = {
  minutes: state => padTime(Math.floor(state.totalTime / 60)),

  seconds: (state, getters) => padTime(state.totalTime - (getters.minutes * 60)),

  isActive: state => !!state.timer
}

const mutations = {
  SET_TIMER (state, payload) {
    state.timer = payload
  },

  DECREMENT_TOTAL_TIME (state) {
    state.totalTime--
  },

  RESET (state) {
    state.totalTime = tempTime

    clearInterval(state.timer)

    state.timer = null
  }
}

const actions = {
  init ({ commit, state }) {
    let timer = setInterval(() => {
      if (state.totalTime > 0) {
        commit('DECREMENT_TOTAL_TIME')

        return
      }
      commit('RESET')
    }, 1000)

    commit('SET_TIMER', timer)
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
