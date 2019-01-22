<template>
  <div class="">
    <div class="flex justify-between items-end">
      <div class="datetime">
        <div class="text-sm">{{ date }}</div>

        <time class="text-5xl">
          <span>{{ hours }}</span>
          <span v-if="seconds % 2 === 0">:</span>
          <span v-else>&nbsp;</span>
          <span>{{ minutes }}</span>
        </time>
      </div>

      <img :src="icon" class="w-16 h-16">
    </div>

    <div class="flex justify-between items-start weather">
      <div class="text-sm mt-2" v-show="wind">
        <div>Humidity: {{ humidity }}</div>
        <div>Pressure: {{ pressure }}</div>
        <div>Wind: {{ wind }}</div>
      </div>

      <div class="flex items-center weather">
        <div class="text-3xl">{{ currentTemp }}&deg;</div>
        <div class="ml-1">
          <div class="text-xs">{{ maxTemp }}&deg;</div>
          <div class="text-xs">{{ minTemp }}&deg;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ClockWeather',

    computed: {
      ...mapGetters({
        date: 'clock/date',
        hours: 'clock/hours',
        minutes: 'clock/minutes',
        seconds: 'clock/seconds',
        currentTemp: 'weather/current',
        minTemp: 'weather/min',
        maxTemp: 'weather/max',
        icon: 'weather/icon',
        humidity: 'weather/humidity',
        pressure: 'weather/pressure',
        wind: 'weather/wind'
      })
    },

    mounted () {
      this.$store.dispatch('clock/init')

      if (process.env.NODE_ENV !== 'development') {
        this.$store.dispatch('weather/init')
      }
    },

    beforeDestroy () {
      this.$store.commit('clock/SET_INTERVAL', null)
      this.$store.commit('weather/SET_INTERVAL', null)
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
