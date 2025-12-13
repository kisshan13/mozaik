import { RequestBuilder } from "@core/endpoint/request-builder"
import { CapabilityHandler } from "./capability"
import { Command } from "@/types/command"

export class TaskHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(command: Command, builder: RequestBuilder) {
        if(command.task){
            builder.addTask(command.task)
        }
            
    }

}