import { RequestGateway } from "@core/request-gateway"
import { Mosaic } from "@/types/mosaic"
import { MosaicEndpointResolver } from "@providers/endpoint-resolver"
import { Message } from "@/types/message"
import { Model } from "@/types/model"

export class MosaicAgent {

    private mosaic: Mosaic
    gateway: RequestGateway = new RequestGateway(new MosaicEndpointResolver())

    constructor(mosaic: Mosaic){
        this.mosaic = mosaic
    }

    setModel(model: Model){
        this.mosaic.model = model
    }

    setMessages(messages: Message[]){
        this.mosaic.messages = messages
    }

    async act(task?: string){
        if(task){
            this.mosaic.task = task
        }
        return await this.gateway.invoke(this.mosaic)
    }
}