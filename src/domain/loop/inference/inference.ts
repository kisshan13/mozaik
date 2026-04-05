import { LoopContext, LoopStatus } from "src/domain/loop/loop-context"
import { GoTo } from "src/domain/loop/transitions/go-to"
import { StateId } from "src/domain/loop/loop-state"
import { Transition } from "src/domain/loop/transition"
import { LoopState } from "src/domain/loop/loop-state"
import { Fail } from "src/domain/loop/transitions/fail"
import { ContextPublisher, ContextListener, Topic } from "src/domain/events/subject"

export class CompletionReceivedListener implements ContextListener {
	onContextUpdate(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class InferenceCompletedListener implements ContextListener {
	onContextUpdate(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class InferenceErrorListener implements ContextListener {
	onContextUpdate(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class Inference implements LoopState {
	private publisher: ContextPublisher
	constructor(publisher: ContextPublisher) {
		this.publisher = publisher
		this.publisher.subscribe(Topic.INFERENCE_COMPLETION_RECEIVED, new CompletionReceivedListener())
		this.publisher.subscribe(Topic.INFERENCE_COMPLETED, new InferenceCompletedListener())
		this.publisher.subscribe(Topic.INFERENCE_ERROR, new InferenceErrorListener())
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

		this.publisher.publish(Topic.INFERENCE_REQUESTED, loopContext)

		return new GoTo(StateId.COMPLETION_RECEIVED)
	}
}
