import { FunctionCall } from "src/domain/context/output/function-call"
import { FunctionCallHandler } from "../handler"
import { RuntimeContext } from "../loop"
import { State, StateId } from "./state"
import { GoTo } from "../transition/go-to"
import { Fail } from "../transition/fail"
import { Transition } from "../transition/transition"

export class FunctionCallState implements State {
	id: StateId = StateId.FUNCTION_CALL_HANDLER
	handler: FunctionCallHandler

	constructor(handler: FunctionCallHandler) {
		this.handler = handler
	}
	async run(runtime: RuntimeContext): Promise<Transition> {
		try {
			const functionCall = runtime.inferenceResponse?.contextItems.find(
				(item) => item.getType() === "function_call",
			)
			if (!functionCall || !(functionCall instanceof FunctionCall)) {
				throw new Error("Function call not found")
			}
			const functionCallOutput = await this.handler.handle(runtime.execution.executionId, functionCall)
			if (!functionCallOutput) {
				throw new Error("Function call output not found")
			}
			runtime.context.addItem(functionCallOutput)
			return new GoTo(StateId.INFERENCE_REQUEST_HANDLER)
		} catch (error) {
			return new Fail((error as Error).message)
		}
	}
}
