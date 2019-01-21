<template>
  <div class="h-screen bg-grey">
    <timer></timer>

    <div class="px-4 text-lg">
      Work sessions completed today: {{ workSession }}
    </div>
  </div>
</template>

<script>
  import Timer from '@/components/pomodoro/Timer'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Pomodoro',

    components: {Timer},

    computed: {
      ...mapGetters('pomodoro', ['workSession'])
    }
  }
</script>

<style scoped>

</style>
