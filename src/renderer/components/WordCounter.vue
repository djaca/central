<template>
  <div class="top">

    <div
      class="rounded-full py-2 px-4 text-sm"
      :class="count >= limit ? 'bg-green' : 'bg-red-light' "
      v-text="wordCount"
    ></div>

    <vue-countable
      :text="$store.state.counter.text"
      elementId="wordCounter"
      @change="wordsChanged"
    ></vue-countable>
  </div>
</template>

<script>
  import VueCountable from 'vue-countable'

  export default {
    name: 'WordCounter',

    components: {VueCountable},

    computed: {
      count () {
        return this.$store.state.counter.words
      },

      wordCount () {
        return this.count + ' words'
      },

      limit () {
        return this.$store.state.counter.limit
      }
    },

    methods: {
      wordsChanged (event) {
        this.$store.dispatch('counter/setCount', event.words)
      }
    }
  }
</script>

<style scoped>
  .top {
    width: 100%;
    display: flex;
    align-items: center;
  }
</style>
