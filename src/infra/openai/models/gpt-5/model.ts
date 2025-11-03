import { Message } from "../../../../core/message"
import { CustomToolSpec } from "../../../../core/tool"
import { ChatCompletion } from "../../endpoints/chat-completion"
import { EndpointStrategy } from "../../../../core/strategy"
import { Gpt5Descriptor } from "./descriptor"
  
export class Gpt5 {
    
    readonly desc = new Gpt5Descriptor()
    private strategy: EndpointStrategy

    constructor(strategy?: EndpointStrategy){
        this.strategy = strategy ?? new ChatCompletion(this.desc)
    }
  
    conversation(messages: Message[]): Gpt5 { 
        this.strategy.setConversation(messages)
        return this
    }

    tools(tools: CustomToolSpec[]): Gpt5 { 
        this.strategy.setTools(tools)
        return this
    }

    async send(){
        return await this.strategy.send()
    }
}