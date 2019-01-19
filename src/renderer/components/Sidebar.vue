<template>
  <div class="flex-none w-full md:max-w-xs bg-grey">
    <div class="m-4">
      <v-clock></v-clock>
    </div>

    <div class="menu mt-6">
      <ul class="list-reset">
        <li>
          <router-link
            exact
            to="/"
            class="block p-4 text-grey-darker font-bold hover:text-grey-dark"
            active-class="border-grey-dark border-r-4"
          >Pomodoro
          </router-link>
        </li>
        <li>
          <router-link
            to="/morning-pages"
            class="block p-4 text-grey-darker font-bold hover:text-grey-dark"
            active-class="border-grey-dark border-r-4"
          >Morning Pages
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import VClock from '@/components/VClock'

  export default {
    name: 'Sidebar',

    components: {VClock}
  }
</script>

<style scoped>
  .menu a {
    text-decoration: none;
  }
</style>
