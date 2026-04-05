import { Loop } from "@loop/loop"
import { LoopContext } from "@loop/loop-context"
import { InferenceNotificationPublisher } from "src/domain/notifications/inference"

export class LoopExecution {
	private notificationPublisher: InferenceNotificationPublisher
	constructor(notificationPublisher: InferenceNotificationPublisher) {
		this.notificationPublisher = notificationPublisher
	}

	async execute(loopContext: LoopContext): Promise<void> {
		const loop = Loop.create(loopContext)
		//loop.start(loopContext)
		this.notificationPublisher.notify(loop.getId(), loopContext)
	}
}
