
interface BaseCapabilities {
    toolCalls: boolean
    structuredOutput: boolean
    supportsChatJSON: boolean
}
  
interface NonReasoningCapabilities extends BaseCapabilities {
    reasoningEffort: "none"
}
  
interface ReasoningCapabilities extends BaseCapabilities {
    reasoningEffort: "low" | "med" | "high"
}

enum EndpointKind { CHAT = "CHAT", RESPONSES = "RESPONSES" }

interface EndpointAdapter {
    send(request: any): any
}
  
interface BaseModel<Capabilities extends BaseCapabilities> {
    name: string
    capabilities: Capabilities
    endpoints: Map<EndpointKind, EndpointAdapter>
}
  
type NonReasoningModel = BaseModel<NonReasoningCapabilities>
type ReasoningModel = BaseModel<ReasoningCapabilities>