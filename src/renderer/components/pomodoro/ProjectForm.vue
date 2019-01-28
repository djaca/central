<template>
  <div class="py-4 w-5/6 mx-auto">
    <div class="text-center text-3xl mb-6">{{ this.project ? 'Edit' : 'Add' }} Project</div>

    <div class="my-2">
      <div class="flex items-center mb-4">
        <div class="flex justify-between items-center w-full">
          <label class="block font-bold text-right mb-1 mb-0 pr-4">
            Project name
          </label>
          <div class="inline-block relative w-64">
            <input
              v-model="name"
              class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              autofocus
              @keyup.enter="save"
              ref="name"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button class="bg-transparent hover:bg-red-light text-sm text-red-light font-semibold hover:text-white py-2 px-4 border border-red-light hover:border-transparent rounded mr-2" @click="$emit('close')">
        Cancel
      </button>

      <button class="shadow bg-blue hover:bg-blue-light text-sm focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" @click="save">
        {{ this.project ? 'Update' : 'Save' }}
      </button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'ProjectForm',

    props: ['project'],

    data () {
      return {
        name: null
      }
    },

    computed: {
      ...mapGetters('projects', ['projects'])
    },

    methods: {
      save () {
        if (!this.name) {
          this.notify('Name is required!', 'warning')

          return
        }

        if (this.project) {
          this.update()

          return
        }

        this.add()
      },

      add () {
        if (this.projects.some(p => p.name === this.name)) {
          this.projectExistsNotification()

          return
        }

        this.$store.dispatch('projects/add', this.name)

        this.notify('Project successfully created!')

        this.$emit('close')
      },

      update () {
        if (this.projects.filter(p => p._id !== this.project._id).some(p => p.name === this.name)) {
          this.projectExistsNotification()

          return
        }

        if (this.name === this.project.name) {
          this.$emit('close')

          return
        }

        this.$store.dispatch('projects/update', {id: this.project._id, data: {name: this.name}})

        this.notify('Project successfully updated!')

        this.$emit('close')
      },

      projectExistsNotification () {
        this.notify('Project with that name already exists!', 'warning')
      },

      notify (title, type = 'success') {
        this.$toast.fire({title, type})

        if (type === 'warning') {
          this.$refs.name.focus()
        }
      }
    },

    mounted () {
      if (this.project) {
        this.name = this.project.name
      }

      this.$refs.name.focus()
    }
  }
</script>
