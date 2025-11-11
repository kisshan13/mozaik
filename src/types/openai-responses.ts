export interface ResponseInput {
  type: 'message' | 'none'
  role?: 'user' | 'assistant' | 'system'
  content?: ContentPart[]
  response_id?: string  // For stateful continuations
}

export interface ContentPart {
  type: 'input_text' | 'input_image' | 'text'
  text?: string
  image_url?: { url: string }
}

export interface ResponsesAPIRequest {
  model: string
  input: ResponseInput
  tools?: ToolDefinition[]
  temperature?: number
  max_tokens?: number
}

export interface ResponsesAPIResponse {
  id: string
  response_id: string
  output: OutputItem[]
  usage?: {
    input_tokens: number
    output_tokens: number
  }
}

export interface OutputItem {
  type: 'message' | 'tool_calls'
  role: string
  content: ContentPart[]
}

export interface ToolDefinition {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: any
  }
}
