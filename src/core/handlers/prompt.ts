import { RequestBuilder } from "@core/request-builder"
import { CapabilityHandler } from "./capability"
import { InvocationRequest } from "@/types/request"

export class PromptHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(request: InvocationRequest, builder: RequestBuilder) {
        if(request.prompt){
            builder.addPrompt(request.prompt)
        }
            
    }

}