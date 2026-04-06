import { InferenceNotification } from "@loop/states/inference"
import { Loop } from "@loop/loop"
import { InferenceNotificationPublisher } from "src/domain/notifications/inference"
import { Notification } from "src/domain/notifications/notification-publisher"
import { Command, CommandListener } from "src/domain/commands/command-sender"
import { InferenceCommandSender } from "src/domain/commands/inference"

export class LoopExecutor implements CommandListener {
	private notificationPublisher: InferenceNotificationPublisher
	private inferenceCommandSender: InferenceCommandSender

	constructor(notificationPublisher: InferenceNotificationPublisher, inferenceCommandSender: InferenceCommandSender) {
		this.notificationPublisher = notificationPublisher
		this.inferenceCommandSender = inferenceCommandSender
	}
	onCommand(loopId: string, command: Command): void {
		throw new Error("Method not implemented.")
	}

	async start(loop: Loop): Promise<void> {
		//loop.start(loopContext)

		this.inferenceCommandSender.subscribe(loop.getId(), this)

		const notification = new Notification(InferenceNotification.COMPLETED, loop)
		this.notificationPublisher.notify(loop.getId(), notification)
	}
}
