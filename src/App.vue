<template>
  <div class="mx-auto max-w-6xl">
    <chat-content :chat="messages" />
    <chat-input @submit-input="submitInput" class="sticky bottom-9 z-10" />
    <p class="bg-gray-800 p-3 z-1 flex justify-center sticky bottom-0 font-thin text-sm align-bottom">
      Who are the
      <span class="px-1 font-semibold text-md"><a href="volcanicminds.com">Volcanic Minds</a></span
      >?
    </p>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue'
import ChatContent from './components/ChatContent.vue'
import ChatInput from './components/ChatInput.vue'
// import SamplePipeline from './transformers/SamplePipeline.js?worker&url'

export default {
  el: '#app',
  name: 'app',
  components: {
    ChatContent,
    ChatInput
  },
  setup() {
    // const worker = ref([]);
    // onMounted(async () => {
    //   const res = await SamplePipeline.getInstance()
    //   worker.value = res;
    // });

    const worker = new Worker(new URL('./transformers/worker.js', import.meta.url), {
      type: 'module'
    })

    return {
      worker: worker
    }
  },
  data() {
    return {
      messages: [
        {
          type: 'assistant',
          message: 'Hello!',
          status: 'complete'
        },
        {
          type: 'user',
          message: 'Hi! What is this?',
          status: 'complete'
        },
        {
          type: 'assistant',
          message:
            'This is a simple test to try out transformers.js in your web app without depending on external servers! This test uses a basic model (gpt2) for simple experimentation, but feel free to explore other (onnx) models through HF.',
          status: 'complete'
        },
        {
          type: 'assistant',
          message: 'Hint: Xenova/gpt2 is a text generation model, so try somethings like: Once upon a time, ',
          status: 'complete'
        }
      ]
    }
  },
  methods: {
    scrollToEnd() {
      const el = this.$el.getElementsByClassName('message-' + (this.messages.length - 1))
      if (el && el.length > 0) {
        el[0].scrollIntoView({ behavior: 'smooth' })
      }
    },
    submitInput(input) {
      this.messages.push({
        type: 'user',
        message: input,
        status: 'complete'
      })

      this.worker.postMessage({
        // task: 'text-generation',
        // model: 'Xenova/gpt2',
        text: input,
        // options
        // use_cache: false,
        // max_length: 50,
        // max_new_tokens: 200,
        // temperature: 0.9,
        // repetition_penalty: 23.0
        // // no_repeat_ngram_size: 3,
        // // top_k: 0,
        // // do_sample: true,

        max_new_tokens: 200,
        temperature: 0.9,
        repetition_penalty: 2.0,
        no_repeat_ngram_size: 3,
        top_k: 2
      })
      this.scrollToEnd()
      this.worker.onmessage = (event) => {
        let { status, output } = event.data
        if (status === 'progress') {
          status = 'update'
          output = 'I need to download some stuff, wait a while..'
        }
        if (status === 'done') {
          status = 'update'
          output = 'Ok all done. Let me thinking now ..'
        }

        if (['update', 'complete'].includes(status)) {
          const last = this.messages[this.messages.length - 1]
          if (last && last.status === 'update' && last.type === 'assistant') {
            // remove last message
            this.messages.pop()
          }

          const message = Array.isArray(output) && output.length > 0 ? output[0]?.generated_text || output[0] : output

          this.messages.push({
            type: 'assistant',
            message: message,
            status: status
          })

          this.scrollToEnd()
        }
      }
    }
  }
}
</script>
