import { RuntimeContext } from "./runtime"

export enum StateId {
	LOOP_START,
	CONTEXT_UPDATE,
	INFERENCE,
	RESPONSE_PROCESSING,
	DECIDE,
	TOOL_EXECUTION,
	LOOP_END,
}

export enum ExecutionStatus {
	RUNNING,
	COMPLETED,
	FAILED,
}

export class Session {
	sessionId: string
	currentState: StateId
	previousState: StateId | null
	status: ExecutionStatus
	stepCount: number
	retryCounts: Map<StateId, number>

	constructor(sessionId: string) {
		this.sessionId = sessionId
		this.previousState = null
		this.status = ExecutionStatus.RUNNING
		this.currentState = StateId.LOOP_START
		this.stepCount = 0
		this.retryCounts = new Map<StateId, number>()
	}

	isTerminal(): boolean {
		return this.status == ExecutionStatus.COMPLETED || this.status == ExecutionStatus.FAILED
	}
}

export interface Transition {
	apply(session: Session, context: RuntimeContext): Promise<void>
}

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(session: Session, context: RuntimeContext): Promise<void> {
		session.previousState = session.currentState
		session.currentState = this.next
		session.stepCount++
	}
}

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(session: Session, context: RuntimeContext): Promise<void> {
		session.status = ExecutionStatus.COMPLETED
	}
}

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(session: Session, context: RuntimeContext): Promise<void> {
		session.status = ExecutionStatus.FAILED
	}
}

export interface State {
	run(session: Session, context: RuntimeContext): Promise<Transition>
}

export class LoopStart implements State {
	async run(session: Session, context: RuntimeContext): Promise<Transition> {
		return new GoTo(StateId.INFERENCE)
	}
}

export class ContextUpdate implements State {
	async run(session: Session, context: RuntimeContext): Promise<Transition> {
		return new GoTo(StateId.INFERENCE)
	}
}

export class Inference implements State {
	async run(session: Session, context: RuntimeContext): Promise<Transition> {
		return new GoTo(StateId.RESPONSE_PROCESSING)
	}
}

export class ToolExecution implements State {
	async run(session: Session, context: RuntimeContext): Promise<Transition> {
		const providerResponse = context.providerResponse

		if (!providerResponse) {
			throw new Error("Provider response not found")
		}

		return new GoTo(StateId.INFERENCE)
	}
}

export class ResponseProcessing implements State {
	async run(session: Session, context: RuntimeContext): Promise<Transition> {
		return new GoTo(StateId.TOOL_EXECUTION)
	}
}
