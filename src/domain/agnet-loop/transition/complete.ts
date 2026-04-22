import { RuntimeContext } from "@domain/agnet-loop/loop"
import { ExecutionStatus } from "@domain/agnet-loop/execution"
import { Transition } from "@domain/agnet-loop/transition/transition"

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
