export interface TextOut { text: string }

/** REQUIRED: tool_call_id must be present to reply to a specific assistant call */
export interface ToolResultPart {
    type: "tool_result"
    tool_call_id: string   // REQUIRED by OpenAI ChatCompletionToolMessageParam
    result: unknown       // JSON-serializable
    name?: string
}

export interface CustomToolSpec { 
    name: string
    description: string
    schema: Record<string, any>
    invoke: (args: any) => Promise<any>
}