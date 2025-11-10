
import { InvocationRequest } from "@/types/request"
import { ModelProvider } from "./model-provider"
import { ProviderResolver } from "./provider-resolver"

export class RequestGateway {

    provider!: ModelProvider

    constructor(readonly providerResolver: ProviderResolver){

    }

    invoke(request: InvocationRequest): any {
        this.provider = this.providerResolver.resolve(request.model)
        const providerRequest = this.provider.buildRequest(request)
        return this.provider.sendRequest(providerRequest)
    }

}