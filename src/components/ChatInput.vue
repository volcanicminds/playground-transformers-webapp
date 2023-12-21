<template>
  <div>
    <form @submit.prevent="submit()">
      <label for="chat" class="sr-only">Your message</label>
      <div class="flex items-center py-2 rounded-lg bg-gray-50 space-x-3">
        <textarea
          id="chat"
          @keydown.enter.exact.prevent="submit()"
          autofocus
          v-model="message"
          rows="1"
          class="block mx-4 p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message here.."
        ></textarea>
        <button
          type="submit"
          class="inline-flex justify-center py-2 pr-4 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            class="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"
            />
          </svg>
          <span class="sr-only">Send message</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['submit-input'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submit-input', this.message)
      this.message = null
    }
  }
}
</script>
