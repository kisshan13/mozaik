import { RuntimeContext } from "@domain/agnet-loop/loop"
import { ExecutionStatus } from "@domain/agnet-loop/execution"
import { Transition } from "@domain/agnet-loop/transition/transition"

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
