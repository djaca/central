<template>
  <div class="">
    <div class="flex justify-between items-end">
      <div class="datetime">
        <div class="text-sm">{{ $store.getters['clock/date']}}</div>

        <time class="text-5xl">
          <span>{{ hours }}</span>
          <span v-if="seconds % 2 === 0">:</span>
          <span v-else>&nbsp;</span>
          <span>{{ minutes }}</span>
        </time>
      </div>

      <img :src="icon" class="w-16 h-16" alt="weather">
    </div>

    <div class="flex justify-between items-start weather">
      <div class="text-sm mt-2">
        <div>Humidity: {{ humidity }}%</div>
        <div>Pressure: {{ pressure }}</div>
        <div>Wind: {{ wind }}</div>
      </div>

      <div class="flex items-center weather">
        <div class="text-3xl">{{ temps.current }}&deg;</div>
        <div class="ml-1">
          <div class="text-xs">{{ temps.max }}&deg;</div>
          <div class="text-xs">{{ temps.min }}&deg;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-clock',

    data () {
      return {
        datetime: null,
        weather: null
      }
    },

    computed: {
      hours () {
        return this.$store.getters['clock/hours']
      },

      minutes () {
        return this.$store.getters['clock/minutes']
      },

      seconds () {
        return this.$store.getters['clock/seconds']
      },

      temps () {
        return this.$store.state.weather.temp
      },

      icon () {
        return this.$store.getters['weather/icon']
      },

      humidity () {
        return this.$store.state.weather.humidity
      },

      pressure () {
        return this.$store.getters['weather/pressure']
      },

      wind () {
        return this.$store.getters['weather/wind']
      }
    },

    mounted () {
      this.datetime = setInterval(() => {
        this.$store.dispatch('clock/init')
      }, 1000)

      this.$store.dispatch('weather/init')

      this.weather = setInterval(() => {
        this.$store.dispatch('weather/init')
      }, 1000 * 60 * 60)
    },

    beforeDestroy () {
      clearInterval(this.ticker)
      clearInterval(this.weatherTicker)
    }
  }
</script>

<style scoped>
  .datetime {
    font-family: 'Orbitron', sans-serif;
  }

  .weather {
    font-family: 'Merriweather', serif;
  }
</style>
