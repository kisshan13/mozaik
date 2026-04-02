import { Tool } from "./tool"

export enum StateId {
	CYCLE_START,
	CONTEXT_CONSTRUCTION,
	INFERENCE,
	OUTPUT_EXTRACTION,
	OUTPUT_VALIDATION,
	OUTPUT_EXECUTION,
	OUTPUT_REJECTION,
	CYCLE_END,
}

export enum SessionStatus {
	RUNNING,
	COMPLETED,
	FAILED,
}

export class SessionContext {
	sessionId: string
	selectedTool: Tool | null
	currentState: StateId
	previousState: StateId | null
	status: SessionStatus
	stepCount: number
	retryCounts: Map<StateId, number>

	constructor(sessionId: string) {
		this.sessionId = sessionId
		this.previousState = null
		this.status = SessionStatus.RUNNING
		this.currentState = StateId.CYCLE_START
		this.selectedTool = null
		this.stepCount = 0
		this.retryCounts = new Map<StateId, number>()
	}

	isTerminal(): boolean {
		return this.status == SessionStatus.COMPLETED || this.status == SessionStatus.FAILED
	}
}

export interface Transition {
	apply(sessionContext: SessionContext): Promise<void>
}

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(sessionContext: SessionContext): Promise<void> {
		sessionContext.previousState = sessionContext.currentState
		sessionContext.currentState = this.next
		sessionContext.stepCount++
	}
}

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(sessionContext: SessionContext): Promise<void> {
		sessionContext.status = SessionStatus.COMPLETED
	}
}

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(sessionContext: SessionContext): Promise<void> {
		sessionContext.status = SessionStatus.FAILED
	}
}

export interface State {
	run(sessionContext: SessionContext): Promise<Transition>
}
