import { InferenceNotification } from "@loop/states/inference"
import { Loop } from "@loop/loop"
import { InferenceNotificationPublisher } from "src/domain/notifications/inference"
import { Notification } from "src/domain/notifications/notification-publisher"
import { CommandHandler, InferenceRun } from "src/domain/commands/command-sender"
import { InferenceCommandSender } from "src/domain/commands/inference"

export class InferenceCommandHandler implements CommandHandler {
	private notificationPublisher: InferenceNotificationPublisher
	private inferenceCommandSender: InferenceCommandSender

	constructor(notificationPublisher: InferenceNotificationPublisher, inferenceCommandSender: InferenceCommandSender) {
		this.notificationPublisher = notificationPublisher
		this.inferenceCommandSender = inferenceCommandSender
	}

	handle(loopId: string, inferenceRun: InferenceRun): void {
		const notification = new Notification(InferenceNotification.COMPLETED, inferenceRun.loop)
		this.notificationPublisher.notify(loopId, notification)
	}

	async start(loop: Loop): Promise<void> {
		//loop.start(loopContext)

		this.inferenceCommandSender.subscribe(loop.getId(), this)
	}
}
