<template>
  <div class="py-4 w-5/6 mx-auto">
    <div class="text-center text-3xl mb-6">Settings</div>

    <div class="my-2">
      <div class="flex items-center mb-4">
        <div class="flex justify-between items-center w-full">
          <label class="block font-bold text-right mb-1 mb-0 pr-4">
            Work session duration
          </label>
          <div class="inline-block relative w-48">
            <select v-model="formData.sessionDuration" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option
                v-for="(t, i) in 80"
                :key="i"
                v-if="t > 9 && t % 5 === 0"
                :value="t"
              >
                {{ t }} minutes
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <div class="flex justify-between items-center w-full">
          <label class="block font-bold text-right mb-1 mb-0 pr-4">
            Short break duration
          </label>
          <div class="inline-block relative w-48">
            <select v-model="formData.shortBreak" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option
                v-for="(t, i) in 10"
                :key="i"
                v-if="t >= 3"
                :value="t"
              >
                {{ t }} minutes
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <div class="flex justify-between items-center w-full">
          <label class="block font-bold text-right mb-1 mb-0 pr-4">
            Long break duration
          </label>
          <div class="inline-block relative w-48">
            <select v-model="formData.longBreak" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option
                v-for="(t, i) in 45"
                :key="i"
                v-if="t >= 9 && t % 5 === 0"
                :value="t"
              >
                {{ t }} minutes
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <div class="flex justify-between items-center w-full">
          <label class="block font-bold text-right mb-1 mb-0 pr-4">
            Long break interval
          </label>
          <div class="inline-block relative w-48">
            <select v-model="formData.longBreakInterval" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option
                v-for="(t, i) in 10"
                :key="i"
                v-if="t > 1"
                :value="t"
              >
                {{ t }} work sessions
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button class="bg-transparent hover:bg-red-light text-sm text-red-light font-semibold hover:text-white py-2 px-4 border border-red-light hover:border-transparent rounded mr-2" @click="$emit('close')">
        Cancel
      </button>

      <button class="shadow bg-blue hover:bg-blue-light text-sm focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" @click="save">
        Save
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Settings',

    data () {
      return {
        formData: {
          sessionDuration: this.$store.state.pomodoro.sessionDuration,
          shortBreak: this.$store.state.pomodoro.shortBreak,
          longBreak: this.$store.state.pomodoro.longBreak,
          longBreakInterval: this.$store.state.pomodoro.longBreakInterval
        }
      }
    },

    methods: {
      save () {
        this.$store.commit('pomodoro/SET', this.formData)

        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>
