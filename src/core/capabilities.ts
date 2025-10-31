import { Message } from "./message"

export interface TextOut { text: string }

export interface ToolDef {
    name: string
    description?: string
    schema: Record<string, any>
}

export type Provider = "openai" | "anthropic" | "local"
  
export interface Trace {
    model: string
    provider: Provider
    inputTokens?: number
    outputTokens?: number
    costUSD?: number
    latencyMs?: number
    meta?: Record<string, unknown>
}

export interface ToolCallPart {
    type: "tool_call"
    name: string
    arguments: unknown // parsed JSON
}

/** REQUIRED: tool_call_id must be present to reply to a specific assistant call */
export interface ToolResultPart {
    type: "tool_result"
    tool_call_id: string   // REQUIRED by OpenAI ChatCompletionToolMessageParam
    result: unknown       // JSON-serializable
    name?: string
}

export interface TextGen {
    text(messages: Message[]): Promise<TextOut>
}

export interface ToolSpec { 
    name: string
    description: string
    schema: Record<string, any>
    invoke: (args: any) => Promise<any>
}

export interface ToolCall { 
    name: string
    args: unknown 
}

export interface ToolUse {
    withTools(messages: Message[], tools: ToolSpec[]): Promise<{ text: string; toolCalls: ToolCall[] }>
}

export interface Vision {
    vision(messages: Message[]): Promise<TextOut>
}
