import { Message } from "../../../../core/message"
import { CustomToolSpec } from "../../../../core/tool"
import { ChatCompletion } from "../../endpoints/chat-completion"
import { EndpointStrategy } from "../../../../core/strategy"
import { Gpt5NanoDescriptor } from "./descriptor"
  
export class Gpt5Nano {
    
    readonly desc: Gpt5NanoDescriptor = new Gpt5NanoDescriptor()

    constructor(private strategy: EndpointStrategy = new ChatCompletion(this.desc)){}
  
    context(messages: Message[]): Gpt5Nano { 
        this.strategy.setContext(messages)
        return this
    }

    tools(tools: CustomToolSpec[]): Gpt5Nano { 
        this.strategy.setTools(tools)
        return this
    }

    async send(){
        return await this.strategy.send()
    }
}