import { Context } from "../context"

export enum TokenDeliveryMode {
	BUFFERING = "buffering",
	STREAMING = "streaming",
}

export enum StateId {
	INITIALIZED = "initialized",
	WAITING_INFERENCE = "waiting_inference",
	STREAMING_INFERENCE = "streaming_inference",
	CANDIDATE_MUTATION = "candidate_mutation",
	CANDIDATE_ACCEPTION = "candidate_acception",
	CANDIDATE_REJECTION = "candidate_rejection",
	LOOP_END = "loop_end",
}

export class WorkflowRun {
	private id: string
	private context: Context
	private currentState: StateId
	private previousState: StateId | null
	private tokenDeliveryMode: TokenDeliveryMode

	constructor(
		id: string,
		context: Context,
		currentState: StateId,
		previousState: StateId | null,
		tokenDeliveryMode: TokenDeliveryMode,
	) {
		this.id = id
		this.context = context
		this.currentState = currentState
		this.previousState = previousState
		this.tokenDeliveryMode = tokenDeliveryMode
	}

	getId(): string {
		return this.id
	}

	getContext(): Context {
		return this.context
	}

	getCurrentState(): StateId {
		return this.currentState
	}

	getPreviousState(): StateId | null {
		return this.previousState
	}

	getTokenDeliveryMode(): TokenDeliveryMode {
		return this.tokenDeliveryMode
	}

	setCurrentState(state: StateId): void {
		this.previousState = this.currentState
		this.currentState = state
	}

	isTerminated(): boolean {
		return this.currentState == StateId.LOOP_END
	}

	static create(context: Context, tokenDeliveryMode: TokenDeliveryMode = TokenDeliveryMode.BUFFERING) {
		const id = crypto.randomUUID()
		const currentState = StateId.INITIALIZED
		const previousState = null
		return new WorkflowRun(id, context, currentState, previousState, tokenDeliveryMode)
	}
}
