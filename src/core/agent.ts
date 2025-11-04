
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
  
interface BaseModel<Capabilities extends BaseCapabilities> {
    name: string
    capabilities: Capabilities
    send(payload: any): Promise<any>
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
        return this.model.send({ endpoint: "chat", input })
    }
  
    // Execute — only for reasoning-capable models
    async execute(this: Agent<ReasoningModel>, goal: string) {
        console.log(`→ RESPONSES endpoint for ${this.model.name}`)
        return this.model.send({ endpoint: "responses", goal })
    }
}

// === Example Models ===
export const gpt4Turbo: NonReasoningModel = {
    name: "gpt-4-turbo",
    capabilities: {
      toolCalls: true,
      structuredOutput: true,
      supportsChatJSON: true,
      reasoningEffort: "none"
    },
    send: async payload => ({ ok: true, payload })
}
  
export const gpt5Reasoning: ReasoningModel = {
    name: "gpt-5-reasoning",
    capabilities: {
        toolCalls: true,
        structuredOutput: true,
        supportsChatJSON: true,
        reasoningEffort: "high"
    },
    send: async payload => ({ ok: true, payload })
}