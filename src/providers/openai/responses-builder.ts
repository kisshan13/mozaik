import { Message } from "@/types/message"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesMapper } from "./responses-mapper"
import { ResponseInput } from "@/types/openai-responses"

export class OpenAIResponsesBuilder extends RequestBuilder {
  constructor(private mapper = new OpenAIResponsesMapper()) {
    super()
  }

  addModel(model: string): RequestBuilder {
    this.request.model = model
    return this
  }

  addTask(task: string): RequestBuilder {
    // Responses API uses input object, not messages array
    const input: ResponseInput = {
      type: 'message' as const,
      role: 'user',
      content: [{ type: 'input_text', text: task }]
    }
    this.request.input = input
    return this
  }

  addMessages(messages: Message[]): RequestBuilder {
    // Map messages to Responses API input format
    const responseInput = this.mapper.toResponseInput(messages)
    this.request.input = responseInput
    return this
  }

  /**
   * Support stateful conversations by referencing a previous response
   * @param responseId The ID of the previous response to continue from
   */
  addResponseId(responseId: string): RequestBuilder {
    const input: ResponseInput = {
      type: 'none' as const,
      response_id: responseId
    }
    this.request.input = input
    return this
  }
}
