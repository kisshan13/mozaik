import { Provider } from "@/core/provider"
import { ChatRequest, TaskRequest } from "@/core/request"
import { Endpoint } from "@core/endpoint"
import { ModelRegistry } from "@core/model"
import { GPT5Mini, GPT5Nano } from "@providers/openai/models"

export class OpenAIProvider extends Provider {

    
    endpoints: Endpoint[] = []  
    registry: ModelRegistry = new ModelRegistry()

    constructor(){
      super()
      this.registry.register(new GPT5Mini())
      this.registry.register(new GPT5Nano())

    }

    async chatCompletion(req: ChatRequest) {
      console.log("POST /chat", { prompt: req.prompt })
      return { output: `Chat(${req.prompt})` }
    }
  
    async responses(req: TaskRequest) {
      console.log("POST /responses", { steps: req.steps })
      return { output: "Plan executed" }
    }
}