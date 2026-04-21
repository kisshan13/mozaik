import { FunctionCall } from "src/domain/context/output/function-call"
import { FunctionCallHandler } from "../handler"
import { RuntimeContext } from "../loop"
import { State, StateId } from "./state"
import { GoTo } from "../transition/go-to"
import { Transition } from "../transition/transition"
import { Fail } from "../transition/fail"

export class FunctionCallState implements State {
	id: StateId = StateId.FUNCTION_CALL_PENDING
	handler: FunctionCallHandler

	constructor(handler: FunctionCallHandler) {
		this.handler = handler
	}
	next(runtime: RuntimeContext): Transition {
		const functionCall = runtime.inferenceResponse?.contextItems.find((item) => item.getType() === "function_call")
		if (!functionCall || !(functionCall instanceof FunctionCall)) {
			return new Fail("Function call not found")
		}
		const functionCallOutput = runtime.functionCallOutput
		if (!functionCallOutput) {
			return new Fail("Function call output not found")
		}
		runtime.context.addItem(functionCallOutput)
		return new GoTo(StateId.INFERENCE_PENDING)
	}
}
