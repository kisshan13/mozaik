import { RequestBuilder } from "@core/request-builder"
import { CapabilityHandler } from "./capability"
import { InvocationRequest } from "@/types/request"

export class MessagesHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(request: InvocationRequest, builder: RequestBuilder) {
        if(request.messages){
            builder.addMessages(request.messages)
        }
    }

}