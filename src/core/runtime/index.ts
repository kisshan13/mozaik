import { MozaikRequest } from "@/types/request"
import { EndpointResolverState, RequestDispatchState, RequestMappingState, ResponseProcessingState } from "./state"
import { Endpoint } from "@core/endpoint/endpoint"


export interface RuntimeContext {
    request: MozaikRequest
    endpoint: Endpoint | null
    providerRequest: any | null
    providerResponse: any | null
}


export class RuntimeEngine {
  
    async run(mozaikRequest: MozaikRequest): Promise<void> {

        let context: RuntimeContext = {
            request: mozaikRequest,
            endpoint: null,
            providerRequest: null,
            providerResponse: null
        }

        const endpointResolverState = new EndpointResolverState()
        context = await endpointResolverState.run(context)

        const requestMappingState = new RequestMappingState()
        context = await requestMappingState.run(context)

        const requestDispatchState = new RequestDispatchState()
        context = await requestDispatchState.run(context)

        const responseProcessingState = new ResponseProcessingState()
        context = await responseProcessingState.run(context)
    }
  

  }