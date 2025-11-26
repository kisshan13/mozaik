import { Mosaic } from "@/types/mosaic"
import { CapabilityHandler } from "./capability"
import { RequestBuilder } from "@core/request-builder"

export class StructuredOutputlHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(request: Mosaic, builder: RequestBuilder) {
        if(request.structuredOutput){
            builder.addStructuredOutput(request.structuredOutput)
        }
            
    }

}