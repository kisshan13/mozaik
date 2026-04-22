import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { State, StateId } from "@domain/agent-loop/state/state"
import { GoTo } from "@domain/agent-loop/transition/go-to"
import { Transition } from "@domain/agent-loop/transition/transition"
import { Fail } from "@domain/agent-loop/transition/fail"
import { HookId } from "@app/agent-runtime/hooks-registry"

export class FunctionCallState implements State {
	id: StateId = StateId.FUNCTION_CALL_PENDING

	entry(runtime: RuntimeContext): HookId | undefined {
		const functionCall = runtime.inferenceResponse?.contextItems.find((item) => item.getType() === "function_call")
		if (!functionCall || !(functionCall instanceof FunctionCall)) {
			throw new Error("Function call not found")
		}
		return HookId.BEFORE_FUNCTION_CALL
	}

	next(runtime: RuntimeContext): Transition {
		const functionCallOutput = runtime.functionCallOutput
		if (!functionCallOutput) {
			return new Fail("Function call output not found")
		}
		runtime.context.addItem(functionCallOutput)
		return new GoTo(StateId.INFERENCE_PENDING)
	}
}
