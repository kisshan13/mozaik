import { Message, TextPart, ImagePart } from "@/types/message"
import { CustomToolSpec } from "@/types/tools"
import { ResponseInput, ContentPart } from "@/types/openai-responses"

export class OpenAIResponsesMapper {
  constructor(private model?: string) {}

  /**
   * Convert domain Messages to Responses API input format
   * Unlike Chat Completions which uses messages[], Responses uses input object
   * 
   * Note: Currently only maps the last message as the input.
   * The Responses API manages conversation state server-side, so previous
   * messages are tracked via response_id in stateful conversations.
   * For multi-turn conversations without state, consider using Chat Completions.
   */
  toResponseInput(messages: Message[]): ResponseInput {
    if (messages.length === 0) {
      throw new Error('[ResponsesMapper] Cannot create input from empty messages')
    }

    const lastMessage = messages[messages.length - 1]
    
    // Map to Responses API input format
    return {
      type: 'message',
      role: lastMessage.role as 'user' | 'assistant' | 'system',
      content: this.mapContent(lastMessage.content)
    }
  }

  private mapContent(content: string | Array<TextPart | ImagePart>): ContentPart[] {
    if (typeof content === 'string') {
      return [{ type: 'input_text', text: content }]
    }

    return content.map(part => {
      if ((part as any).type === 'text') {
        return { type: 'input_text', text: (part as TextPart).text }
      }
      if ((part as any).type === 'image_url') {
        return { 
          type: 'input_image', 
          image_url: { url: (part as ImagePart).url } 
        }
      }
      throw new Error(`[ResponsesMapper] Unsupported content type: ${(part as any).type}`)
    })
  }

  /**
   * Map tools to Responses API format (similar to Chat Completions)
   */
  toTools(tools: CustomToolSpec[]) {
    return tools.map(t => ({
      type: 'function',
      function: {
        name: t.name,
        description: t.description,
        parameters: t.schema
      }
    }))
  }
}
