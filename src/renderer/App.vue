<template>
  <div id="app" class="min-h-screen md:flex">
    <sidebar></sidebar>

    <div class="flex-1">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
