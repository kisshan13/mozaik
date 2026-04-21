import { RuntimeContext } from "../runtime"
import { ExecutionStatus } from "../execution"
import { Transition } from "./transition"

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
