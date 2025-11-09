
import { InvocationRequest } from "@/types/request"
import { ModelProvider } from "./model-provider"
import { ProviderResolver } from "./provider-resolver"

export class RequestGateway {

    provider: ModelProvider

    constructor(readonly providerRespolver: ProviderResolver){
        this.provider = providerRespolver.defaultProvider()
    }

    invoke(request: InvocationRequest): any {
        this.providerRespolver.resolve(request.model)
        const providerRequest = this.provider.buildRequest(request)
        return this.provider.sendRequest(providerRequest)
    }

}