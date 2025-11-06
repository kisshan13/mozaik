import { Message } from "./message";

// --- Core ---
class Specification { constructor(readonly maxCtx: number, readonly rate: number) {} }

class BaseRequest {
    model: string

    constructor(model: string){
        this.model = model
    }
}

class ChatRequest extends BaseRequest { 
    constructor(readonly prompt: string, readonly model: string, readonly messages: Message[] = []) {
        super(model)
    }
}
class TaskRequest extends BaseRequest { 
    constructor(readonly task: string, readonly steps: string[], readonly model: string) {
        super(model)
    } 
}

abstract class ModelProvider {}

class OpenAIProvider extends ModelProvider {

    async chatCompletion(req: ChatRequest) {
      console.log("POST /chat", { prompt: req.prompt });
      return { output: `Chat(${req.prompt})` };
    }
  
    async responses(req: TaskRequest) {
      console.log("POST /responses", { steps: req.steps });
      return { output: "Plan executed" }
    }
}

enum Provider {
    OPENAI, ANTROPIC
}

// --- Model (capability) ---
abstract class Model {
    abstract readonly name: string
    abstract readonly provider: Provider
    abstract readonly specification: Specification
}

class GPT5Nano extends Model {
    name = 'gpt-5-nano'
    provider = Provider.OPENAI
    specification = new Specification(400_000, 1000)
}

class GPT5Mini extends Model {
    name = 'gpt-5-mini'
    provider = Provider.OPENAI
    specification = new Specification(400_000, 1000)
}

class ModelFactory {

    static get(model: string): Model | null {

        switch(model){
            case 'gpt-5-mini':
                return new GPT5Mini()
            case 'gpt-5-nano':
                return new GPT5Nano()
            default:
                return null
        }
    }
}
  
// --- Endpoints ---
abstract class Endpoint {

    abstract provider: ModelProvider
    
    constructor(readonly models: Set<string>) {}

    protected ensure(model: Model) {
      if (!this.models.has(model.name)) throw new Error("Model not supported")
    }

    abstract processRequest(req: BaseRequest): any

    async accept(req: BaseRequest): Promise<any> {
        const model = ModelFactory.get(req.model)
        if (!model) throw new Error('Model doesn`t exist')

        this.ensure(model)
        return await this.processRequest(req)

        
    }
}
  
class ChatCompletion extends Endpoint {

    provider = new OpenAIProvider()

    constructor(){
        const supportedModels = new Set(["gpt-5-nano"])
        super(supportedModels)
    }

    async processRequest(req: ChatRequest) {
        return await this.provider.chatCompletion(req)
    }
}

class Responses extends Endpoint {
    provider = new OpenAIProvider()

    constructor(){
        const supportedModels = new Set(["gpt-5-nano"])
        super(supportedModels)
    }

    async processRequest(req: TaskRequest) {
        return await this.provider.responses(req)
    }
}


const chat: ChatRequest = {
    messages: [{role: 'assistant', content: ''}],
    prompt: 'What is the capital of Serbia',
    model: 'gpt-5-nano'
}

const responses: Endpoint = new Responses()
const chatCompletion: Endpoint = new ChatCompletion()

const task: TaskRequest = {
    task: '',
    model: 'gpt-5',
    steps: ["Analyze", "Plan", "Execute"]
}
chatCompletion.accept(chat)
responses.accept(task)
