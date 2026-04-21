import { RuntimeContext } from "../runtime"
import { ExecutionStatus } from "../execution"
import { Transition } from "./transition"

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
