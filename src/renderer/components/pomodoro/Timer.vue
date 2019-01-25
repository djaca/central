<template>
  <div class="py-2 px-6">
    <div class="text-center">
      <div class="text-5xl h-32">
        <div
          class="pt-6"
          v-show="!isActive"
        >
          Ready to go to work?
        </div>

        <div v-show="isActive">
          <time class="text-grey-lightest font-bold">
            <span>{{ minutes }}</span>
            <span>:</span>
            <span>{{ seconds }}</span>
          </time>
        </div>
      </div>

      <button
        class="bg-transparent hover:text-white py-2 px-4 text-2xl hover:border-transparent rounded-full hover:bg-red-lighter text-red"
        v-if="onBreak"
        @click="skipBreak"
      >
        Skip break
      </button>

      <button
        class="bg-transparent hover:text-white py-2 px-4 text-2xl hover:border-transparent rounded-full"
        :class="isActive ? 'hover:bg-red-lighter text-red' : 'hover:bg-green-light text-green'"
        @click="action"
        v-else
      >
        {{ isActive ? 'Forfeit' : 'Start' }} work session
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Timer',

    computed: {
      ...mapGetters('pomodoro', ['minutes', 'seconds', 'isActive', 'sessionCount', 'onBreak', 'sessionFinished', 'breakDuration'])
    },

    watch: {
      sessionFinished (val) {
        if (val) {
          this.openBreakDialog()
        }
      }
    },

    methods: {
      skipBreak () {
        this.$store.dispatch('pomodoro/endBreak')
      },

      action () {
        this.isActive ? this.forfeit() : this.start()
      },

      start () {
        this.$store.dispatch('pomodoro/initSession')
      },

      forfeit () {
        this.$swal.fire({
          toast: true,
          title: 'Do you really want to forfeit this work session?',
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'No! I can do this!',
          cancelButtonText: 'Yes, I give up!'
        }).then((result) => {
          if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$store.commit('pomodoro/RESET')
          }
        })
      },

      openBreakDialog () {
        this.$swal.fire({
          toast: true,
          title: `You can now take ${this.breakDuration} minutes break`,
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: 'Take a break',
          cancelButtonText: 'Skip break'
        }).then((result) => {
          this.$store.commit('pomodoro/SET_FINISH', false)

          if (result.value) {
            this.$store.dispatch('pomodoro/initBreak')

            return
          }

          this.$store.commit('pomodoro/RESET')
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
