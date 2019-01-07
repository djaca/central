<template>
  <div id="app" class="min-h-screen md:flex">
    <div class="flex-none w-full md:max-w-xs bg-grey">
      <div class="m-4">
        <v-clock></v-clock>
      </div>
    </div>
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import VClock from '@/components/VClock'

  export default {
    name: 'central',

    components: {VClock}
  }
</script>

<style>
  /* CSS */
</style>
