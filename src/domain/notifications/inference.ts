import { LoopContext } from "@loop/loop-context"
import { NotificationPublisher } from "./notification-publisher"
import { NotificationListener } from "./notification-listener"
import { InferenceNotification } from "@loop/inference/inference"

export abstract class InferenceNotificationListener extends NotificationListener {
	abstract onNotification(loopContext: LoopContext): void
}

export class InferenceNotificationPublisher extends NotificationPublisher<InferenceNotification> {
	subscribe(loopId: string, listener: NotificationListener): void {
		console.log("InferenceNotificationPublisher: Subscribing to loop", loopId)
		super.subscribe(loopId, listener)
	}

	notify(loopId: string, loopContext: LoopContext): void {
		console.log("InferenceNotificationPublisher: Publishing to loop", loopId)
		super.notify(loopId, loopContext)
	}
}
