<template>
  <div class="h-screen bg-grey">
    <timer></timer>
  </div>
</template>

<script>
  import Timer from '@/components/pomodoro/Timer'

  export default {
    name: 'Pomodoro',

    components: {Timer}
  }
</script>

<style scoped>

</style>
