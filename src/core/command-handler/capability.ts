import { Command } from "@/types/command"
import { RequestBuilder } from "../request-builder"

export abstract class CapabilityHandler {

    abstract nextHandler: CapabilityHandler

    setNextHandler(capability: CapabilityHandler): CapabilityHandler {
        this.nextHandler = capability
        return this.nextHandler
    }

    abstract apply(command: Command, requestBuilder: RequestBuilder): any

    handle(command: Command, builder: RequestBuilder){
        this.apply(command, builder)

        if (this.nextHandler) {
            this.nextHandler.handle(command, builder)
        }
    }
}