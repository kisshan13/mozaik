import { ProviderResolver } from "@core/provider-resolver"
import { RequestGateway } from "@core/request-gateway"
import { MosaicProviderResolver } from "@providers/provider-resolver"
import { InvocationRequest } from "./types/request"

const resolver: ProviderResolver = new MosaicProviderResolver()
const gateway: RequestGateway = new RequestGateway(resolver)

export {
    gateway,
    InvocationRequest
}