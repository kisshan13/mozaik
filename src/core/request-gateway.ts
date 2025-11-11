
import { Mosaic } from "@/types/mosaic"
import { Endpoint } from "./endpoint"
import { EndpointResolver } from "./endpoint-resolver"

export class RequestGateway {

    endpoint!: Endpoint

    constructor(readonly endpointResolver: EndpointResolver){}

    invoke(request: Mosaic): any {
        this.endpoint = this.endpointResolver.resolve(request.model)
        const endpointRequest = this.endpoint.buildRequest(request)
        return this.endpoint.sendRequest(endpointRequest)
    }

}