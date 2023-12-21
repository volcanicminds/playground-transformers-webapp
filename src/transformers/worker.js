import { pipeline, env } from '@xenova/transformers'

env.allowLocalModels = false

/**
 * This class uses the Singleton pattern to ensure that only one instance of the pipeline is loaded.
 */
class SamplePipeline {
  static task = 'text-generation'
  static model = 'Xenova/gpt2'
  static instance = null

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback })
    }

    return this.instance
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  const { model, task, text, ...rest } = event.data

  if (SamplePipeline.model !== model || SamplePipeline.task !== task) {
    // Invalidate model if different
    SamplePipeline.model = model || SamplePipeline.model
    SamplePipeline.task = task || SamplePipeline.task

    if (SamplePipeline.instance !== null) {
      ;(await SamplePipeline.getInstance()).dispose()
      SamplePipeline.instance = null
    }
  }

  // Retrieve the code-completion pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  const generator = await SamplePipeline.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x)
  })

  // Actually perform the code-completion
  let output = await generator(text, {
    ...rest,

    // Allows for partial output
    callback_function: (x) => {
      self.postMessage({
        status: 'update',
        output: generator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
      })
    }
  })

  // Send the output back to the main thread
  self.postMessage({
    status: 'complete',
    output: output
  })
})
