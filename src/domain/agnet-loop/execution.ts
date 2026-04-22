import { StateId } from "@domain/agnet-loop/state/state"
import { TransitionRecord } from "@domain/agnet-loop/transition/transition"

export enum ExecutionStatus {
	RUNNING,
	COMPLETED,
	FAILED,
}

export class Execution {
	executionId: string
	currentStateId: StateId
	previousStateId: StateId | null
	status: ExecutionStatus
	stepCount: number
	retryCounts: Map<StateId, number>
	history: TransitionRecord[]

	constructor(
		executionId: string,
		currentStateId: StateId,
		previousStateId: StateId | null,
		status: ExecutionStatus,
		stepCount: number,
		retryCounts: Map<StateId, number>,
		history: TransitionRecord[],
	) {
		this.executionId = executionId
		this.currentStateId = currentStateId
		this.previousStateId = previousStateId
		this.status = status
		this.stepCount = stepCount
		this.retryCounts = retryCounts
		this.history = history
	}

	isTerminal(): boolean {
		return this.status == ExecutionStatus.COMPLETED || this.status == ExecutionStatus.FAILED
	}

	static create(): Execution {
		const executionId = crypto.randomUUID()
		const currentStateId = StateId.USER_MESSAGE_RECEIVED
		const previousStateId = null
		const status = ExecutionStatus.RUNNING
		const stepCount = 0
		const retryCounts = new Map<StateId, number>()
		const history: TransitionRecord[] = []
		return new Execution(executionId, currentStateId, previousStateId, status, stepCount, retryCounts, history)
	}
}
