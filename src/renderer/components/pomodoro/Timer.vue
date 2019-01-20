<template>
  <div class="py-2 px-6">
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

    watch: {
      workSession () {
        this.openBreakDialog()
      }
    },

    methods: {
      action () {
        this.isActive ? this.forfeit() : this.start()
      },

      start () {
        this.$store.dispatch('pomodoro/init')
      },

      forfeit () {
        this.$swal.fire({
          title: 'Do you really want to forfeit this work session?',
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, I give up!',
          cancelButtonText: 'No! I can do this!'
        }).then((result) => {
          console.log('here')
          if (result.value) {
            this.$store.dispatch('pomodoro/forfeit')
          }
        })
      },

      openBreakDialog () {
        this.$swal.fire({
          title: 'You can now take 5 minutes break',
          type: 'success',
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: 'Skip break',
          cancelButtonText: 'Take a break',
          cancelButtonColor: 'blue'
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch('pomodoro/forfeit')
          }
        })
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
