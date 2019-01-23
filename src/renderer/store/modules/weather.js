import config from '@/config'
import log from 'electron-log'
import weather from '@/api/weather'

const state = {
  interval: null,
  location: null,
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
  location: state => state.location,

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
    return new Promise((resolve, reject) => {
      let location = config.get('weather.city')

      if (!location) {
        // config.set('weather.city', 'Belgrade,rs')
        reject(new Error('No city provided'))
        log.warn('No city provided')

        return
      }

      commit('SET_LOCATION', location)

      dispatch('fetchApi')
        .then(data => {
          commit('SET_DATA', data)
        })
        .then(() => {
          let interval = setInterval(() => {
            dispatch('fetchApi')
              .then(data => {
                commit('SET_DATA', data)
              })
              .catch(err => {
                commit('SET_INTERVAL', null)
                reject(err)
              })
          }, 1000 * 60 * 60)

          commit('SET_INTERVAL', interval)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  fetchApi ({state}) {
    return new Promise((resolve, reject) => {
      weather(state.location)
        .then(({status, data}) => {
          if (status === 200) {
            resolve(data)

            return
          }

          reject(new Error(data))
          log.warn('Weather status: ' + status)
          log.warn(data)
        })
        .catch(err => {
          reject(new Error('Error fetching weather api'))
          log.error('Error fetching weather api! ' + err)
        })
    })
    // weather(state.location)
    //   .then(({status, data}) => {
    //     if (status === 200) {
    //       commit('SET_DATA', data)
    //     }
    //   })
    //   .catch(err => {
    //     log.error('Error fetching weather api!!! ' + err)
    //   })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
