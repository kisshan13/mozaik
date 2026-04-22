import { RuntimeContext } from "@domain/agent-loop/loop"
import { ExecutionStatus } from "@domain/agent-loop/execution"
import { Transition } from "@domain/agent-loop/transition/transition"

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(context: RuntimeContext): Promise<void> {
		const execution = context.execution
		execution.status = ExecutionStatus.COMPLETED
	}
}
