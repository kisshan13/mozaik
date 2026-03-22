import { DefaultEndpointResolver } from "@/infra/endpoint-resolver"
import { RuntimeContext } from "."

export enum StateId {
	REQUEST_MAPPING,
	REQUEST_DISPATCH,
	COST_CALCULATION,
	DECISION,
	TOOL_CALLING,
	RESPONSE_PROCESSING,
	COMPLETED,
	FAILED,
}

export enum ExecutionStatus {
	RUNNING,
	COMPLETED,
	FAILED,
}

export interface TransitionRecord {
	fromState: StateId
	toState: StateId
	timestamp: Date
	duration: number
	error: Error | null
}

export class Execution {
	executionId: string
	currentState: StateId
	previousState: StateId | null
	status: ExecutionStatus
	stepCount: number
	retryCounts: Map<StateId, number>
	history: TransitionRecord[]

	constructor(executionId: string) {
		this.executionId = executionId
		this.previousState = null
		this.status = ExecutionStatus.RUNNING
		this.currentState = StateId.REQUEST_MAPPING
		this.stepCount = 0
		this.retryCounts = new Map<StateId, number>()
		this.history = []
	}

	isTerminal(): boolean {
		return this.status == ExecutionStatus.COMPLETED || this.status == ExecutionStatus.FAILED
	}
}

export interface Transition {
	apply(execution: Execution, context: RuntimeContext): Promise<void>
}

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(execution: Execution, context: RuntimeContext): Promise<void> {
		execution.previousState = execution.currentState
		execution.currentState = this.next
		execution.stepCount++
		execution.history.push({
			fromState: execution.previousState,
			toState: execution.currentState,
			timestamp: new Date(),
			duration: 0,
			error: null,
		})
	}
}

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(execution: Execution, context: RuntimeContext): Promise<void> {
		execution.status = ExecutionStatus.COMPLETED
	}
}

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(execution: Execution, context: RuntimeContext): Promise<void> {
		execution.status = ExecutionStatus.FAILED
	}
}

export interface State {
	run(execution: Execution, context: RuntimeContext): Promise<Transition>
}

export class RequestMappingState implements State {
	async run(execution: Execution, context: RuntimeContext): Promise<Transition> {
		execution.currentState = StateId.REQUEST_MAPPING

		return new GoTo(StateId.REQUEST_DISPATCH)
	}
}

export class RequestDispatchState implements State {
	async run(execution: Execution, context: RuntimeContext): Promise<Transition> {
		execution.currentState = StateId.REQUEST_DISPATCH
		const providerRequest = context.providerRequest

		if (!providerRequest) {
			throw new Error("Provider request not found")
		}

		const endpointResolver = new DefaultEndpointResolver()
		const endpoint = endpointResolver.resolve(context.context.model)

		const providerResponse = await endpoint.sendRequest(providerRequest)
		context.providerResponse = providerResponse

		return new GoTo(StateId.COST_CALCULATION)
	}
}

export class CostCalculationState implements State {
	async run(execution: Execution, context: RuntimeContext): Promise<Transition> {
		return new GoTo(StateId.DECISION)
	}
}

export class ToolCallingState implements State {
	async run(execution: Execution, context: RuntimeContext): Promise<Transition> {
		const providerResponse = context.providerResponse

		if (!providerResponse) {
			throw new Error("Provider response not found")
		}

		return new GoTo(StateId.RESPONSE_PROCESSING)
	}
}

export class ResponseProcessingState implements State {
	async run(execution: Execution, context: RuntimeContext): Promise<Transition> {
		return new GoTo(StateId.COMPLETED)
	}
}
