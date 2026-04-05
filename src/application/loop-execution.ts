import { Loop } from "@loop/loop"
import { LoopContext } from "@loop/loop-context"
import { InferenceEventPublisher, InferenceSignalPublisher } from "src/domain/events/inference-publisher"

export class LoopExecution {
	private signalPublisher: InferenceSignalPublisher
	constructor(signalPublisher: InferenceSignalPublisher) {
		this.signalPublisher = signalPublisher
	}

	async execute(loopContext: LoopContext): Promise<void> {
		const loop = new Loop(this.signalPublisher)
		loop.start(loopContext)
	}
}
