import { Message } from "@/types/message"
import { RequestBuilder } from "@core/request-builder"
import { OpenAIResponsesMapper } from "./responses-mapper"

export class OpenAIResponsesBuilder extends RequestBuilder {
  constructor(private mapper = new OpenAIResponsesMapper()) {
    super()
  }

  addModel(model: string): RequestBuilder {
    this.request.model = model
    return this
  }

  addTask(task: string): RequestBuilder {
    // Responses API requires 'input' parameter (string)
    // Set input to the user's task
    this.request.input = task
    
    return this
  }

  addMessages(messages: Message[]): RequestBuilder {
    // Map messages to Responses API format
    // Extract user input for the 'input' field
    // System messages become 'instructions' (optional)
    const instructions = this.mapper.toInstructions(messages)
    const userInput = this.mapper.extractUserInput(messages)
    
    // Set required 'input' parameter
    if (userInput) {
      this.request.input = userInput
    } else {
      // Fallback if no user message found
      this.request.input = "Continue the conversation"
    }
    
    // Set optional instructions if there's a system message
    if (instructions && instructions !== "You are a helpful assistant.") {
      this.request.instructions = instructions
    }
    
    return this
  }

  /**
   * Support stateful conversations by referencing a previous response
   * @param responseId The ID of the previous response to continue from
   */
  addPreviousResponseId(responseId: string): RequestBuilder {
    this.request.previous_response_id = responseId
    return this
  }

  /**
   * Link to an existing conversation
   * @param conversationId The ID of the conversation to link to
   */
  addConversation(conversationId: string): RequestBuilder {
    this.request.conversation = { id: conversationId }
    return this
  }
}
