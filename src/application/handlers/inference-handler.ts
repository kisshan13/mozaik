import { InferenceNotification } from "@loop/inference/state"
import { Loop } from "@loop/loop"
import { InferenceNotificationPublisher } from "src/domain/notifications/inference"
import { Notification } from "src/domain/notifications/notification-publisher"
import { InferenceRun } from "@loop/inference/command"
import { CommandHandler } from "src/domain/command/handler"
import { CommandSubscription } from "src/domain/command/subscription"

export class InferenceCommandHandler implements CommandHandler<InferenceRun> {
	private notificationPublisher: InferenceNotificationPublisher
	private inferenceRunSubscription: CommandSubscription<InferenceRun>

	constructor(
		notificationPublisher: InferenceNotificationPublisher,
		inferenceRun: CommandSubscription<InferenceRun>,
	) {
		this.notificationPublisher = notificationPublisher
		this.inferenceRunSubscription = inferenceRun
	}

	handle(loopId: string, inferenceRun: InferenceRun): void {
		const notification = new Notification(InferenceNotification.COMPLETED, inferenceRun.loop)
		this.notificationPublisher.notify(loopId, notification)
	}

	async start(loop: Loop): Promise<void> {
		//loop.start(Context)

		this.inferenceRunSubscription.subscribe(loop.getId(), this)
	}
}
