<template>
  <div class="">
    <div class="flex justify-between items-end">
      <div class="datetime">
        <div class="text-sm" v-text="date"></div>

        <time class="text-5xl">
          <span v-text="hours"></span>
          <span v-if="seconds % 2 === 0">:</span>
          <span v-else>&nbsp;</span>
          <span v-text="minutes"></span>
        </time>
      </div>

      <img
        :src="icon"
        class="w-16 h-16"
        alt="weather"
        v-show="isActive"
      >
    </div>

    <div
      class="flex justify-between items-start weather"
      v-show="isActive"
    >
      <div class="text-sm mt-2">
        <div>Humidity: {{ humidity }}</div>
        <div>Pressure: {{ pressure }}</div>
        <div>Wind: {{ wind }}</div>
      </div>

      <div>
        <div class="flex items-center weather">
          <div class="text-3xl">{{ currentTemp }}&deg;</div>
          <div class="ml-1">
            <div class="text-xs">{{ maxTemp }}&deg;</div>
            <div class="text-xs">{{ minTemp }}&deg;</div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-sm" v-text="location"></div>

    <button
      class="text-xs"
      @click="addCity"
    >
      {{ location ? 'Edit' : 'Add' }} city
    </button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ClockWeather',

    computed: {
      ...mapGetters({
        isActive: 'weather/isActive',
        location: 'weather/location',
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

    watch: {
      location () {
        this.getWeather()
      }
    },

    methods: {
      getWeather () {
        this.$store.dispatch('weather/init')
          .catch(({message}) => {
            this.$toast.fire({
              title: message,
              type: 'error'
            })
          })
      },

      addCity () {
        let options = {
          title: `${this.location ? 'Edit' : 'Add'} location`,
          input: 'text',
          showCancelButton: true,
          confirmButtonText: 'Add',
          inputValidator: (value) => !value && 'You need to write something!'
        }

        if (this.location) {
          options.inputValue = this.location
        }

        this.$swal.fire(options)
          .then(({value, dismiss}) => {
            if (dismiss === this.$swal.DismissReason.cancel) {
              return
            }

            this.$store.dispatch('weather/setLocation', value)
          })
      }
    },

    mounted () {
      this.$store.dispatch('clock/init')

      this.getWeather()
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
