const state = {
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
  }
}

const actions = {
  init ({commit}) {
    commit('SET_DATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

function padZero (number) {
  return number < 10 ? `0${number}` : number
}
