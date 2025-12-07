import { Command } from "@/types/command"
import { CapabilityHandler } from "./capability"
import { RequestBuilder } from "@core/request-builder"

export class StructuredOutputlHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(command: Command, builder: RequestBuilder) {
        if(command.structuredOutput){
            builder.addStructuredOutput(command.structuredOutput)
        }
            
    }

}