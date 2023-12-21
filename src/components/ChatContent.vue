<template>
  <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col">
    <div
      id="messages"
      class="min-h-screen flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <Message
        v-for="(m, index) in messages"
        v-bind:key="`message-${index}`"
        :status="m.status"
        :type="m.type"
        :message="m.message"
        :class="`message-${index}`"
      />
    </div>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'ChatContent',
  props: {
    chat: Array
  },
  components: {
    Message
  },
  data() {
    return {
      messages: this.chat
    }
  }
}
</script>

<style scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>
