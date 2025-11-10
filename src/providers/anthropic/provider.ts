import { ModelProvider } from "@core/model-provider"
import { RequestBuilder } from "@core/request-builder"
import { AnthropicRequestBuilder } from "./builder"
import Anthropic from "@anthropic-ai/sdk"

export class AnthropicProvider extends ModelProvider {
  requestBuilder: RequestBuilder = new AnthropicRequestBuilder()

  constructor(private client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })) {
    super()
  }

  async sendRequest(providerRequest: any) {
    const response = await this.client.messages.create(providerRequest)
    
    // Extract text from content blocks
    return response.content
      .filter(block => block.type === 'text')
      .map(block => block.type === 'text' ? block.text : '')
      .join('')
  }
}
