import { Tool } from "./tool"

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
	selectedTool: Tool | null
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
		this.selectedTool = null
		this.stepCount = 0
		this.retryCounts = new Map<StateId, number>()
	}

	isTerminal(): boolean {
		return this.status == ExecutionStatus.COMPLETED || this.status == ExecutionStatus.FAILED
	}
}

export interface Transition {
	apply(session: Session): Promise<void>
}

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(session: Session): Promise<void> {
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

	async apply(session: Session): Promise<void> {
		session.status = ExecutionStatus.COMPLETED
	}
}

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(session: Session): Promise<void> {
		session.status = ExecutionStatus.FAILED
	}
}

export interface State {
	run(session: Session): Promise<Transition>
}

export class LoopStart implements State {
	async run(session: Session): Promise<Transition> {
		return new GoTo(StateId.CONTEXT_UPDATE)
	}
}

export class ContextUpdate implements State {
	async run(session: Session): Promise<Transition> {
		return new GoTo(StateId.INFERENCE)
	}
}

export class Inference implements State {
	async run(session: Session): Promise<Transition> {
		return new GoTo(StateId.RESPONSE_PROCESSING)
	}
}

export interface ToolExecutionAdapter {
	execute(tool: Tool): Promise<unknown>
}

export class ToolExecution implements State {
	private toolExecutionAdapter: ToolExecutionAdapter

	constructor(toolExecutionAdapter: ToolExecutionAdapter) {
		this.toolExecutionAdapter = toolExecutionAdapter
	}

	async run(session: Session): Promise<Transition> {
		if (!session.selectedTool) {
			throw new Error("No tool selected")
		}

		await this.toolExecutionAdapter.execute(session.selectedTool)

		return new GoTo(StateId.RESPONSE_PROCESSING)
	}
}

export class ResponseProcessing implements State {
	async run(session: Session): Promise<Transition> {
		return new GoTo(StateId.TOOL_EXECUTION)
	}
}
