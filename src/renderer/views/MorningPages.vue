<template>
  <div class="h-screen text-white p-4" style="background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);">
    <word-counter></word-counter>

    <div class="mt-8">
      <textarea
        class="textarea w-full bg-transparent text-black font-medium text-2xl"
        rows="20"
        placeholder="Put your thoughts here..."
        v-model="text"
        autofocus
      ></textarea>
    </div>
  </div>
</template>

<script>
  import autosize from 'autosize'
  import WordCounter from '@/components/WordCounter'

  export default {
    name: 'MorningPages',

    components: {WordCounter},

    computed: {
      text: {
        get () {
          return this.$store.state.counter.text
        },

        set (val) {
          this.$store.commit('counter/setText', val)
        }
      }
    },

    mounted () {
      this.$nextTick(() => {
        autosize(this.$el.querySelector('textarea'))
      })
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Archivo');

  .textarea {
    font-family: 'Archivo', serif;
  }
</style>
