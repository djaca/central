import axios from 'axios'

const weather = (location) => {
  let uri = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=13b7029b661d5987d0abab0e959da95c&units=metric`

  return axios.get(uri)
}

export default weather
