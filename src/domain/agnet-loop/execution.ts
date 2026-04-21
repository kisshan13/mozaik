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

	constructor(
		executionId: string,
		currentState: StateId,
		previousState: StateId | null,
		status: ExecutionStatus,
		stepCount: number,
		retryCounts: Map<StateId, number>,
		history: TransitionRecord[],
	) {
		this.executionId = executionId
		this.currentState = currentState
		this.previousState = previousState
		this.status = status
		this.stepCount = stepCount
		this.retryCounts = retryCounts
		this.history = history
	}

	isTerminal(): boolean {
		return this.status == ExecutionStatus.COMPLETED || this.status == ExecutionStatus.FAILED
	}

	create(): Execution {
		const executionId = crypto.randomUUID()
		const currentState = StateId.USER_MESSAGE_RECEIVED
		const previousState = null
		const status = ExecutionStatus.RUNNING
		const stepCount = 0
		const retryCounts = new Map<StateId, number>()
		const history: TransitionRecord[] = []
		return new Execution(executionId, currentState, previousState, status, stepCount, retryCounts, history)
	}
}
