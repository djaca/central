<template>
  <div
    class="overflow-hidden rounded-lg shadow-md hover:shadow-lg cursor-pointer bg-white relative"
    @click="select"
    :class="isCurrent ? 'shadow-lg' : ''"
    @mouseover="mouseOver"
    @mouseout="mouseOut"
  >
    <div class="bg-grey-lighter flex items-center justify-between leading-tight p-2 md:p-4">
      <div
        class="absolute pin-t pin-r"
        v-show="active"
        @click="remove"
      >
        <i class="material-icons text-red-light text-2xl">
          close
        </i>
      </div>

      <h1 class="text-xl">{{ project.name }}</h1>
    </div>

    <div class="flex items-center justify-between leading-none p-2 md:p-4">
      <div class="text-sm">
        <b>Time spent:</b> 47h 24m
      </div>
    </div>

    <div class="absolute pin-b pin-r" v-show="isCurrent">
      <i class="material-icons text-green text-2xl">
        check_circle_outline
      </i>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'ProjectCard',

    props: ['project'],

    data () {
      return {
        active: null
      }
    },

    computed: {
      ...mapGetters({
        current: 'projects/current',
        isWorking: 'pomodoro/isWorking'
      }),

      isCurrent () {
        return this.current._id === this.project._id
      }
    },

    methods: {
      select () {
        if (!this.isWorking) {
          this.$store.commit('projects/SET_CURRENT', this.project._id)
        }
      },

      remove () {
        if (this.isWorking) {
          this.$swal.fire({
            toast: true,
            position: 'top',
            title: 'Can`t delete at this moment. Finish working session!',
            type: 'error',
            timer: 3000,
            showConfirmButton: false
          })

          return
        }

        this.$swal.fire({
          title: `Are you sure?`,
          type: 'question',
          allowEscapeKey: false,
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          cancelButtonText: 'No'
        }).then(({value}) => {
          if (value) {
            this.$store.dispatch('projects/delete', this.project._id)
          }
        })
      },

      mouseOver () {
        this.active = true
      },

      mouseOut () {
        this.active = null
      }
    }
  }
</script>
