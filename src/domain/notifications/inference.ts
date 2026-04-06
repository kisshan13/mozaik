import { LoopContext } from "@loop/loop-context"
import { NotificationPublisher } from "./notification-publisher"
import { NotificationListener } from "./notification-listener"
import { Notification } from "./notification-publisher"

export abstract class InferenceNotificationListener extends NotificationListener {
	abstract onNotification(loopContext: LoopContext): void
}

export class InferenceNotificationPublisher extends NotificationPublisher {
	subscribe(loopId: string, listener: NotificationListener): void {
		console.log("InferenceNotificationPublisher: Subscribing to loop", loopId)
		super.subscribe(loopId, listener)
	}

	notify(loopId: string, notification: Notification): void {
		console.log("InferenceNotificationPublisher: Publishing to loop", loopId)
		super.notify(loopId, notification)
	}
}
