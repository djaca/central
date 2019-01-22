import axios from 'axios'
import config from '@/config'

const getUri = location => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=13b7029b661d5987d0abab0e959da95c&units=metric`
}

const state = {
  interval: null,
  location: '',
  weather: {
    icon: null
  },
  temp: {
    current: '',
    min: '',
    max: ''
  },
  humidity: '',
  pressure: '',
  wind: {
    speed: ''
  }
}

const getters = {
  pressure: state => `${state.pressure} hPa`,

  wind: state => `${state.wind.speed} m/s`,

  humidity: state => `${state.humidity} %`,

  icon: state => state.weather.icon ? `http://openweathermap.org/img/w/${state.weather.icon}.png` : '',

  current: state => state.temp.current,

  min: state => state.temp.min,

  max: state => state.temp.max
}

const mutations = {
  SET_DATA (state, payload) {
    state.temp.min = payload.main.temp_min
    state.temp.max = payload.main.temp_max

    state.weather.icon = payload.weather[0].icon

    state.humidity = payload.main.humidity
    state.pressure = payload.main.pressure

    state.wind.speed = payload.wind.speed

    if (payload.main.temp < 0) {
      state.temp.current = Math.ceil(payload.main.temp)

      return
    }
    state.temp.current = Math.floor(payload.main.temp)
  },

  SET_INTERVAL (state, payload) {
    state.interval = payload
  },

  SET_LOCATION (state, payload) {
    state.location = payload
  }
}

const actions = {
  init ({commit, state, dispatch}) {
    let location = config.get('weather.city')

    if (!location) {
      // config.set('weather.city', 'Belgrade,rs')
      console.log('No city provided')

      return
    }

    commit('SET_LOCATION', location)
    let uri = getUri(location)

    dispatch('fetchApi', uri)

    let interval = setInterval(() => {
      dispatch('fetchApi', uri)
    }, 1000 * 60 * 60)

    commit('SET_INTERVAL', interval)
  },

  fetchApi ({commit}, uri) {
    axios.get(uri)
      .then(({status, data}) => {
        if (status === 200) {
          commit('SET_DATA', data)
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
