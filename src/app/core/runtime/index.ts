import { InferenceRequest } from "@/domain/inference/inference-request"
import {
	CostCalculationState,
	Execution,
	RequestDispatchState,
	RequestMappingState,
	ResponseProcessingState,
	State,
	StateId,
	ToolCallingState,
} from "./state"
import { Endpoint } from "@/app/core/endpoint/endpoint"

export interface RuntimeContext {
	inferenceRequest: InferenceRequest
	endpoint: Endpoint | null
	providerRequest: any | null
	providerResponse: any | null
}

export class RuntimeEngine {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.REQUEST_MAPPING, new RequestMappingState())
		this.states.set(StateId.REQUEST_DISPATCH, new RequestDispatchState())
		this.states.set(StateId.COST_CALCULATION, new CostCalculationState())
		this.states.set(StateId.RESPONSE_PROCESSING, new ResponseProcessingState())
		this.states.set(StateId.TOOL_CALLING, new ToolCallingState())
	}

	public async run(execution: Execution, context: RuntimeContext): Promise<void> {
		while (!execution.isTerminal()) {
			const state = this.states.get(execution.currentState)

			if (!state) {
				throw new Error(`State ${execution.currentState} not found`)
			}

			const transition = await state.run(execution, context)

			transition.apply(execution, context)
		}
	}
}
