
import { Command } from "@/types/command"
import { Endpoint } from "./endpoint"
import { EndpointResolver } from "./endpoint-resolver"

export class RequestGateway {

    endpoint!: Endpoint

    constructor(readonly endpointResolver: EndpointResolver){}

    invoke(command: Command): any {
        this.endpoint = this.endpointResolver.resolve(command.model)
        const request = this.endpoint.buildRequest(command)
        return this.endpoint.sendRequest(request)
    }

}