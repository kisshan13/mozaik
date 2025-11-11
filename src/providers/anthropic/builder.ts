import { Message } from "@/types/message"
import { RequestBuilder } from "@core/request-builder"
import { AnthropicMapper } from "./mapper"

export class AnthropicRequestBuilder extends RequestBuilder {
  private mapper = new AnthropicMapper()

  addModel(model: string): RequestBuilder {
    this.request.model = model
    return this
  }

  addTask(task: string): RequestBuilder {
    // Add task as a user message
    const message = {
      role: 'user' as const,
      content: task
    }

    if (!this.request.messages) {
      this.request.messages = []
    }
    
    this.request.messages.push(message)
    return this
  }

  addMessages(messages: Message[]): RequestBuilder {
    const { messages: anthropicMessages, system } = this.mapper.toMessages(messages)
    
    this.request.messages = anthropicMessages
    
    if (system) {
      this.request.system = system
    }
    
    return this
  }

  build() {
    // Anthropic requires max_tokens parameter
    if (!this.request.max_tokens) {
      this.request.max_tokens = 1024
    }
    
    return this.request
  }
}
