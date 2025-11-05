
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

export class Agent<M extends BaseModel<any>> {

    constructor(private readonly model: M) {}
  
    async conversation(
      this: Agent<ReasoningModel | NonReasoningModel>,
      input: string
    ) {
        console.log(`→ CHAT endpoint for ${this.model.name}`)
        const endpoint = this.model.endpoints.get(EndpointKind.CHAT)
        return endpoint?.send({ endpoint: "chat", input })
    }
  
    // Execute — only for reasoning-capable models
    async execute(this: Agent<ReasoningModel>, goal: string) {
        console.log(`→ RESPONSES endpoint for ${this.model.name}`)
        const endpoint = this.model.endpoints.get(EndpointKind.RESPONSES)
        return endpoint?.send({ endpoint: "responses", goal })
    }
}

class ChatCompletion implements EndpointAdapter {
    send(request: any) {
        console.log('Chat Completion')
        return request
    }
}

class Responses implements EndpointAdapter {
    send(request: any) {
        console.log('Responses')
        return request
    }
}

const chatCompletion = new ChatCompletion()
const responses = new Responses()

const openaiEndpoints = new Map<EndpointKind, EndpointAdapter>([
    [EndpointKind.CHAT, chatCompletion],
    [EndpointKind.RESPONSES, responses]
])

// === Example Models ===
export const gpt4Turbo: NonReasoningModel = {
    name: "gpt-4-turbo",
    capabilities: {
        toolCalls: true,
        structuredOutput: true,
        supportsChatJSON: true,
        reasoningEffort: "none"
    },
    endpoints: openaiEndpoints
}
  
export const gpt5Reasoning: ReasoningModel = {
    name: "gpt-5-reasoning",
    capabilities: {
        toolCalls: true,
        structuredOutput: true,
        supportsChatJSON: true,
        reasoningEffort: "high"
    },
    endpoints: openaiEndpoints
}