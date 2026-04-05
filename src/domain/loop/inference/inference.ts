import { LoopContext, LoopStatus } from "src/domain/loop/loop-context"
import { GoTo } from "src/domain/loop/transitions/go-to"
import { StateId } from "src/domain/loop/loop-state"
import { Transition } from "src/domain/loop/transition"
import { LoopState } from "src/domain/loop/loop-state"
import { Fail } from "src/domain/loop/transitions/fail"
import {
	InferenceEventPublisher,
	InferenceSignalListener,
	InferenceSignalPublisher,
} from "src/domain/events/inference-publisher"
import { InferenceEvent, InferenceSignal } from "src/domain/events/topics/inference"

export class CompletionReceivedListener implements InferenceSignalListener {
	onSignal(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class InferenceCompletedListener implements InferenceSignalListener {
	onSignal(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class InferenceErrorListener implements InferenceSignalListener {
	onSignal(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class Inference implements LoopState {
	private signalPublisher: InferenceSignalPublisher
	private eventPublisher: InferenceEventPublisher = new InferenceEventPublisher()

	constructor(signalPublisher: InferenceSignalPublisher) {
		this.signalPublisher = signalPublisher
		this.signalPublisher.subscribe(InferenceSignal.COMPLETION_RECEIVED, new CompletionReceivedListener())
		this.signalPublisher.subscribe(InferenceSignal.COMPLETED, new InferenceCompletedListener())
		this.signalPublisher.subscribe(InferenceSignal.ERROR, new InferenceErrorListener())
	}

	onContextUpdate(loopContext: LoopContext): Transition | void {
		console.log("Inference: Context updated", loopContext)

		if (loopContext.status == LoopStatus.COMPLETED) {
			return new GoTo(StateId.COMPLETION_RECEIVED)
		}
	}

	async run(loopContext: LoopContext): Promise<Transition> {
		if (!loopContext.prompt) {
			return new Fail("Inference: Prompt is required")
		}

		this.eventPublisher.publish(InferenceEvent.REQUESTED, loopContext)

		return new GoTo(StateId.COMPLETION_RECEIVED)
	}
}
