import axios from 'axios'

const state = {
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
  pressure: state => state.pressure + ' hPa',

  wind: state => state.wind.speed + ' m/s',

  icon: state => state.weather.icon ? `http://openweathermap.org/img/w/${state.weather.icon}.png` : ''
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
  }
}

const actions = {
  init ({commit}) {
    let uri = `https://api.openweathermap.org/data/2.5/weather?q=Belgrade,rs&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`

    axios.get(uri)
      .then(({data}) => {
        commit('SET_DATA', data)
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
