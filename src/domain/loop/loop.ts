import { Context } from "./context"
import { StateId } from "./loop-state"

export enum LoopStatus {
	NOT_STARTED = "not_started",
	RUNNING = "running",
	COMPLETED = "completed",
	FAILED = "failed",
}


export class Loop {
	private id: string
	private context: Context
	private currentState: StateId
	private previousState: StateId | null
	private status: LoopStatus
	

	constructor(id: string, status: LoopStatus, context: Context, currentState: StateId, previousState: StateId | null) {
		this.id = id
		this.context = context
		this.status = status
		this.currentState = currentState
		this.previousState = previousState
	}

	getId(): string {
		return this.id
	}

	getContext(): Context {
		return this.context
	}

	isTerminated(): boolean {
		return this.status == LoopStatus.COMPLETED || this.status == LoopStatus.FAILED
	}

	getCurrentState(): StateId {
		return this.currentState
	}

	getPreviousState(): StateId | null {
		return this.previousState
	}

	getStatus(): LoopStatus {
		return this.status
	}
	
	transitionTo(nextState: StateId): void {
		if (this.isTerminated()) {
		  throw new Error("Cannot transition terminated loop")
		}
	
		this.previousState = this.currentState
		this.currentState = nextState
	}

	static create(context: Context) {
		const id = crypto.randomUUID()
		return new Loop(id, LoopStatus.NOT_STARTED, context, StateId.INITIALIZED, null)
	}
}
