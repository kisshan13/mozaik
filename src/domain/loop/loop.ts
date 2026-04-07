import { Context } from "./context"

export enum DeliveryMode {
	SINGLE_RESPONSE = "single_response",
	STREAMING = "streaming",
}

export enum StateId {
	INITIALIZED = "initialized",
	LOOP_START = "loop_start",
	WAITING_INFERENCE = "waiting_inference",
	STREAMING_INFERENCE = "streaming_inference",
	CANDIDATE_MUTATION = "candidate_mutation",
	CANDIDATE_ACCEPTION = "candidate_acception",
	CANDIDATE_REJECTION = "candidate_rejection",
	LOOP_END = "loop_end",
}

export class Loop {
	private id: string
	private context: Context
	private currentState: StateId
	private previousState: StateId | null
	private nextState: StateId | null
	private deliveryMode: DeliveryMode

	constructor(
		id: string,
		context: Context,
		currentState: StateId,
		previousState: StateId | null,
		nextState: StateId | null,
		deliveryMode: DeliveryMode,
	) {
		this.id = id
		this.context = context
		this.currentState = currentState
		this.previousState = previousState
		this.nextState = nextState
		this.deliveryMode = deliveryMode
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

	getDeliveryMode(): DeliveryMode {
		return this.deliveryMode
	}

	getNextState(): StateId | null {
		return this.nextState
	}

	setCurrentState(state: StateId): void {
		this.previousState = this.currentState
		this.currentState = state
	}

	setNextState(state: StateId | null): void {
		this.nextState = state
	}

	isTerminated(): boolean {
		return this.currentState == StateId.LOOP_END
	}

	static create(context: Context, deliveryMode: DeliveryMode = DeliveryMode.SINGLE_RESPONSE) {
		const id = crypto.randomUUID()
		const currentState = StateId.INITIALIZED
		const previousState = null
		const nextState = StateId.LOOP_START
		return new Loop(id, context, currentState, previousState, nextState, deliveryMode)
	}
}
