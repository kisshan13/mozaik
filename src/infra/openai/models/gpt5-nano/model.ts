import { Message } from "../../../../core/message"
import { CustomToolSpec } from "../../../../core/tool"
import { ChatCompletion } from "../../endpoints/chat-completion"
import { RuntimeStrategy } from "../../../../core/runtime"
import { Gpt5NanoDescriptor } from "./descriptor"
  
export class Gpt5Nano {
    
    readonly desc = new Gpt5NanoDescriptor()
    private runtime: RuntimeStrategy

    constructor(runtime?: RuntimeStrategy){
        this.runtime = runtime ?? new ChatCompletion(this.desc)
    }
  
    conversation(messages: Message[]): Gpt5Nano { 
        this.runtime.setConversation(messages)
        return this
    }

    tools(tools: CustomToolSpec[]): Gpt5Nano { 
        this.runtime.setTools(tools)
        return this
    }

    async send(){
        return await this.runtime.send()
    }
}