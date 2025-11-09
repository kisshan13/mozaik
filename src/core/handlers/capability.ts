import { InvocationRequest } from "@/types/request"
import { RequestBuilder } from "../request-builder"

export abstract class CapabilityHandler {

    abstract nextHandler: CapabilityHandler

    setNextHandler(capability: CapabilityHandler): CapabilityHandler{
        this.nextHandler = capability
        return this.nextHandler
    }

    abstract apply(request: InvocationRequest, requestBuilder: RequestBuilder): any

    handle(request:InvocationRequest, builder: RequestBuilder){
        this.apply(request, builder)

        if (this.nextHandler) {
            this.nextHandler.handle(request, builder)
        }
    }
}