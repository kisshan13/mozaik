import { RequestBuilder } from "@core/request-builder"
import { CapabilityHandler } from "./capability"
import { Mosaic } from "@/types/mosaic"

export class TaskHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(request: Mosaic, builder: RequestBuilder) {
        if(request.task){
            builder.addTask(request.task)
        }
            
    }

}