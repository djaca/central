<template>
  <div class="p-2">
    <div class="text-center">
      <div>
        <time class="text-green-dark">
          <span>{{ minutes }}</span>
          <span>:</span>
          <span>{{ seconds }}</span>
        </time>
      </div>

      <button
        class="bg-transparent hover:text-white py-2 px-4 text-2xl hover:border-transparent rounded"
        :class="isActive ? 'hover:bg-red-lighter text-red' : 'hover:bg-green-light text-green'"
        @click="action"
      >
        {{ isActive ? 'Forfeit' : 'Start' }} work session
      </button>
    </div>

    <div class="text-lg">
      Work sessions completed today: {{ workSession }}
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Timer',

    computed: {
      ...mapGetters('pomodoro', ['minutes', 'seconds', 'isActive', 'workSession'])
    },

    methods: {
      action () {
        this.isActive ? this.forfeit() : this.start()
      },

      start () {
        this.$store.dispatch('pomodoro/init')
      },

      forfeit () {
        // todo: dialog...
        this.$store.dispatch('pomodoro/forfeit')
      }
    }
  }
</script>

<style scoped>
  time {
    font-family: 'Londrina Outline', cursive;
    font-size: 6rem;
  }
</style>
