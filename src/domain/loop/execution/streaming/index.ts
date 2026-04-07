import { Loop, StateId } from "@loop/loop"
import { LoopExecutionOrchestrator, LoopSignal } from "../orchestrator"
import { StepId } from "../step"

export class StreamingOrchestrator implements LoopExecutionOrchestrator {
	next(loop: Loop, signal: LoopSignal): StepId {
		const current = loop.getCurrentState()

		if (current === StateId.INITIALIZED && signal === LoopSignal.STARTED) {
			return StepId.CONTEXT_PREPARATION
		}

		if (current === StateId.LOOP_START && signal === LoopSignal.INFERENCE_STARTED) {
			return StepId.INFERENCE_REQUEST
		}

		throw new Error(`Invalid transition: ${current}`)
	}
}
