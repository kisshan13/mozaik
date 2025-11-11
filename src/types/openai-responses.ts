// OpenAI Responses API types based on official documentation
// https://platform.openai.com/docs/api-reference/responses

export interface ResponsesAPIRequest {
  model: string
  instructions: string  // System prompt equivalent
  prompt?: {
    id?: string
    version?: string
    variables?: Record<string, any>
  }
  max_output_tokens?: number
  temperature?: number
  top_p?: number
  tools?: ToolDefinition[]
  tool_choice?: 'none' | 'auto' | 'required'
  parallel_tool_calls?: boolean
  text?: {
    format?: { type: 'text' | 'json_schema' }
    verbosity?: 'low' | 'medium' | 'high'
  }
  conversation?: { id: string }
  previous_response_id?: string
  background?: boolean
  truncation?: 'auto' | 'disabled'
  reasoning?: {
    effort?: 'minimal' | 'low' | 'medium' | 'high'
    summary?: 'auto' | 'concise' | 'detailed'
  }
  metadata?: Record<string, string>
  safety_identifier?: string
  prompt_cache_key?: string
  service_tier?: 'auto' | 'default' | 'flex' | 'scale' | 'priority'
}

export interface ResponsesAPIResponse {
  id: string
  object: 'response'
  status: 'in_progress' | 'completed' | 'failed' | 'cancelled' | 'queued' | 'incomplete'
  created_at: number
  instructions: string
  output: OutputItem[]
  output_text?: string  // SDK convenience: aggregated text
  error?: {
    code: string
    message: string
  } | null
  incomplete_details?: {
    reason: string
  }
  usage?: {
    input_tokens: number
    input_tokens_details?: {
      cached_tokens?: number
    }
    output_tokens: number
    output_tokens_details?: {
      reasoning_tokens?: number
    }
    total_tokens: number
  }
  conversation?: { id: string }
  metadata?: Record<string, string>
}

export interface OutputItem {
  id: string
  type: 'message'
  role: 'assistant'
  content: ContentBlock[]
  status: 'in_progress' | 'completed' | 'incomplete'
}

export interface ContentBlock {
  type: 'output_text'
  text: string
  annotations?: Annotation[]
  logprobs?: LogProb[]
}

export interface Annotation {
  type: string
  file_id?: string
  index?: number
  filename?: string
}

export interface LogProb {
  token: string
  logprob: number
  bytes: number[]
  top_logprobs: Array<{
    token: string
    logprob: number
    bytes: number[]
  }>
}

export interface ToolDefinition {
  type: 'function'
  name: string
  description: string
  parameters: any
  strict?: boolean
}
