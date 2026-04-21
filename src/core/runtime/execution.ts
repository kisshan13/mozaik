import { StateId } from "./state/state"
import { TransitionRecord } from "./transition/transition"

export enum ExecutionStatus {
	RUNNING,
	COMPLETED,
	FAILED,
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
		this.currentState = StateId.USER_MESSAGE_HANDLER
		this.previousState = null
		this.status = ExecutionStatus.RUNNING
		this.stepCount = 0
		this.retryCounts = new Map<StateId, number>()
		this.history = []
	}

	isTerminal(): boolean {
		return this.status == ExecutionStatus.COMPLETED || this.status == ExecutionStatus.FAILED
	}
}
