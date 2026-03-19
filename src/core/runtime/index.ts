import { MozaikRequest } from "@/types/request"
import { DecisionState, EndpointResolverState, Execution, RequestDispatchState, RequestMappingState, ResponseProcessingState, State, StateId, ToolCallingState } from "./state"
import { Endpoint } from "@core/endpoint/endpoint"


export interface RuntimeContext {
    request: MozaikRequest
    endpoint: Endpoint | null
    providerRequest: any | null
    providerResponse: any | null
}


export class RuntimeEngine {
    private states: Map<StateId, State> = new Map<StateId, State>()

    constructor() {
        this.states.set(StateId.ENDPOINT_RESOLVER, new EndpointResolverState())
        this.states.set(StateId.REQUEST_MAPPING, new RequestMappingState())
        this.states.set(StateId.REQUEST_DISPATCH, new RequestDispatchState())
        this.states.set(StateId.DECISION, new DecisionState())
        this.states.set(StateId.TOOL_CALLING, new ToolCallingState())
        this.states.set(StateId.RESPONSE_PROCESSING, new ResponseProcessingState())
    }

    public async run(execution: Execution, context: RuntimeContext): Promise<void> {
        while (!execution.isTerminal()) {
            const state = this.states.get(execution.currentState)

            if (!state) {
                throw new Error(`State ${execution.currentState} not found`)
            }

            const transition = await state.run(execution, context);

            transition.apply(execution, context)
        }
    }

}