import { RuntimeContext } from "@domain/agent-loop/agent-loop"
import { ExecutionStatus } from "@domain/agent-loop/execution"
import { Transition } from "@domain/agent-loop/transition/transition"

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(context: RuntimeContext): Promise<void> {
		const execution = context.execution
		execution.status = ExecutionStatus.FAILED
	}
}
