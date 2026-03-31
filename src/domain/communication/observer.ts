export interface Observer {
    onLlmResponse(llmResponse: unknown): Promise<void> | void
    onToolCall(initiator: string, toolName: string, toolArgs: unknown): Promise<void> | void
    onToolCallResult(toolName: string, toolArgs: unknown, result: unknown): Promise<void> | void
    onMessage(messageType: string, data: unknown): Promise<void> | void
}