<template>
  <div id="app" class="min-h-screen md:flex">
    <sidebar></sidebar>

    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'central',

    components: {Sidebar}
  }
</script>
