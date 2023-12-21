<template>
  <div class="chat-message">
    <div v-if="type === 'assistant'" class="flex items-end">
      <div class="flex flex-col space-y-2 text-lg max-w-3xl mx-2 order-2 items-start">
        <div>
          <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
            <svg
              v-if="isUpdating"
              class="animate-spin -ml-1 mr-1 h-6 w-6 text-blue-600 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ message }}
          </span>
        </div>
      </div>
      <img src="../assets/assistant.svg" alt="Assistant" class="-mr-2 w-12 h-12 order-1" />
    </div>
    <div v-if="type === 'user'" class="flex items-end justify-end">
      <div class="flex flex-col space-y-2 text-lg max-w-3xl mx-2 order-1 items-end">
        <div>
          <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">{{ message }}</span>
        </div>
      </div>
      <img src="../assets/user.svg" alt="User" class="w-9 h-9 ml-2 order-2" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    message: String,
    status: String
  },
  computed: {
    isUpdating() {
      return this.status === 'update'
    }
  }
}
</script>
