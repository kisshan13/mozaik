import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"
import { RuntimeContext } from "@domain/agnet-loop/loop"
import { State, StateId } from "@domain/agnet-loop/state/state"
import { GoTo } from "@domain/agnet-loop/transition/go-to"
import { Transition } from "@domain/agnet-loop/transition/transition"
import { Fail } from "@domain/agnet-loop/transition/fail"

export class FunctionCallState implements State {
	id: StateId = StateId.FUNCTION_CALL_PENDING

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
