<template>
  <div class="h-screen bg-grey">
    <div class="float-right">
      <i class="material-icons text-grey-dark text-2xl cursor-pointer mr-2 mt-2" @click="openSettings">
        settings
      </i>
    </div>

    <timer></timer>

    <div class="px-4 text-lg">
      Work sessions completed today: {{ sessionCount }}

      <projects></projects>
    </div>
  </div>
</template>

<script>
  import Timer from '@/components/pomodoro/Timer'
  import Settings from '@/components/pomodoro/Settings'
  import Projects from '@/components/pomodoro/Projects'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Pomodoro',

    components: {Timer, Projects},

    computed: {
      ...mapGetters('pomodoro', ['sessionCount'])
    },

    methods: {
      openSettings () {
        this.$modal.show(Settings)
      }
    },

    mounted () {
      if (!this.sessionCount) {
        this.$store.dispatch('pomodoro/getTodayWorkSessionCount')
      }
    }
  }
</script>

<style scoped>

</style>
