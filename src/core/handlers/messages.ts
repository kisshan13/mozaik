import { RequestBuilder } from "@core/request-builder"
import { CapabilityHandler } from "./capability"
import { Mosaic } from "@/types/mosaic"

export class MessagesHandler extends CapabilityHandler {
    
    nextHandler!: CapabilityHandler

    apply(request: Mosaic, builder: RequestBuilder) {
        if(request.messages){
            builder.addMessages(request.messages)
        }
    }

}