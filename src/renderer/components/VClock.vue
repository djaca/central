<template>
  <div class="datetime">
    <time class="text-4xl">
      <span>{{ hours }}</span>
      <span v-if="seconds % 2 === 0">:</span>
      <span v-else>&nbsp;</span>
      <span>{{ minutes }}</span>
    </time>

    <div>{{ $store.getters['clock/date']}}</div>
  </div>
</template>

<script>
  export default {
    name: 'v-clock',

    data () {
      return {
        ticker: null
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
      }
    },

    mounted () {
      this.ticker = setInterval(() => {
        this.$store.dispatch('clock/init')
      }, 1000)
    },

    beforeDestroy () {
      clearInterval(this.ticker)
    }
  }
</script>

<style scoped>
  .datetime {
    font-family: 'Orbitron', sans-serif;
  }
</style>
