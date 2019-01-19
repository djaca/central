<template>
  <div class="h-screen bg-grey">
    <div class="p-2 text-center">
      <timer></timer>
    </div>
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
