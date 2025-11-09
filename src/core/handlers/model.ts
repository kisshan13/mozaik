import { RequestBuilder } from "@core/request-builder"
import { CapabilityHandler } from "./capability"
import { InvocationRequest } from "@/types/request"

export class ModelHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(request: InvocationRequest, builder: RequestBuilder) {
        if(request.model){
            builder.addModel(request.model)
        }
            
    }

}