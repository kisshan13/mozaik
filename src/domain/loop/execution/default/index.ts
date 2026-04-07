import { Loop, StateId } from "@loop/loop"
import { LoopExecutionOrchestrator, LoopSignal } from "../orchestrator"
import { StepId } from "../step"

export class DefaultOrchestrator implements LoopExecutionOrchestrator {
	next(loop: Loop, signal: LoopSignal): StepId {
		const current = loop.getCurrentState()

		if (current === StateId.INITIALIZED) {
			return StepId.CONTEXT_PREPARATION
		}

		if (current === StateId.LOOP_START) {
			return StepId.INFERENCE_REQUEST
		}

		if (current === StateId.WAITING_INFERENCE) {
			return StepId.CANDIDATE_MUTATION
		}

		throw new Error(`Invalid transition: ${current}`)
	}
}
