import { RequestBuilder } from "@core/request-builder"
import { CapabilityHandler } from "./capability"
import { Command } from "@/types/command"

export class ModelHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(command: Command, builder: RequestBuilder) {
        if(command.model){
            builder.addModel(command.model)
        }
            
    }

}