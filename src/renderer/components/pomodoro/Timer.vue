<template>
  <div>
    <div>
      <time class="text-green-dark">
        <span>{{ minutes }}</span>
        <span>:</span>
        <span>{{ seconds }}</span>
      </time>
    </div>

    <button class="bg-transparent hover:bg-blue-lighter text-sm text-blue-dark hover:text-white py-1 px-2 hover:border-transparent rounded" @click="start">
      Start work session
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Timer',

    data () {
      return {
        timer: null,
        totalTime: (25 * 60),
        shortBreak: 5,
        longBreak: 15,
        longBreakInterval: 3,
        workSession: 0,
        resetButton: false
      }
    },

    computed: {
      minutes () {
        const minutes = Math.floor(this.totalTime / 60)

        return this.padTime(minutes)
      },
      seconds () {
        const seconds = this.totalTime - (this.minutes * 60)

        return this.padTime(seconds)
      }
    },

    methods: {
      start: function () {
        this.timer = setInterval(() => this.countdown(), 1000)
        this.resetButton = true
      },

      reset: function () {
        this.totalTime = (25 * 60)
        clearInterval(this.timer)
        this.timer = null
        this.resetButton = false
      },

      padTime: function (time) {
        return (time < 10 ? '0' : '') + time
      },

      countdown: function () {
        this.totalTime--
      }
    },

    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  time {
    font-family: 'Londrina Outline', cursive;
    font-size: 6rem;
  }
</style>
