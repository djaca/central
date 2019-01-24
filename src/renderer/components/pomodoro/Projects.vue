<template>
  <div class="h-full">
    <div class="flex flex-wrap w-full -mx-1 lg:-mx-4">
      <div
        v-for="project in projects"
        class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4"
      >
        <project-card
          :project="project"
          :key="project._id"
        ></project-card>
      </div>
    </div>

    <button
      class="mt-6 bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
      Add project
    </button>
  </div>
</template>

<script>
  import ProjectCard from '@/components/pomodoro/ProjectCard'

  export default {
    name: 'Projects',

    components: {ProjectCard},

    computed: {
      projects () {
        return this.$store.state.projects.items
      }
    }
  }
</script>

<style scoped>

</style>
