import { DefaultEndpointResolver } from "@providers/endpoint-resolver";
import { RuntimeContext } from ".";

export abstract class MozaikRuntimeState {

    abstract run(context: RuntimeContext): Promise<RuntimeContext>
}

export class EndpointResolverState extends MozaikRuntimeState {
    async run(context: RuntimeContext): Promise<RuntimeContext> {
        const endpoint = new DefaultEndpointResolver()
        .resolve(context.request.model)
        context.endpoint = endpoint
        return context
    }
}

export class RequestMappingState extends MozaikRuntimeState {
    async run(context: RuntimeContext): Promise<RuntimeContext> {
        const endpoint = context.endpoint

        if (!endpoint) {
            throw new Error("Endpoint not found")
        }

        const providerRequest = endpoint.buildRequest(context.request)
        context.providerRequest = providerRequest
        
        return context
    }
}

export class RequestDispatchState extends MozaikRuntimeState {
    async run(context: RuntimeContext): Promise<RuntimeContext> {
        return context
    }
}

export class ResponseProcessingState extends MozaikRuntimeState {
    async run(context: RuntimeContext): Promise<RuntimeContext> {
        return context
    }
}