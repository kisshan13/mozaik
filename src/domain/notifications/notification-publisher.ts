import { NotificationListener } from "./notification-listener"
import { Loop } from "@loop/loop"

export class Notification {
	private notificationType: string
	private loop: Loop

	constructor(notificationType: string, loop: Loop) {
		this.notificationType = notificationType
		this.loop = loop
	}

	getNotificationType(): string {
		return this.notificationType
	}

	getLoop(): Loop {
		return this.loop
	}
}
export class NotificationPublisher {
	private loops: Map<string, NotificationListener[]> = new Map()

	subscribe(loopId: string, listener: NotificationListener): void {
		if (!this.loops.has(loopId)) {
			this.loops.set(loopId, [])
		}

		this.loops.get(loopId)!.push(listener)
	}

	notify(loopId: string, notification: Notification): void {
		if (!this.loops.has(loopId)) {
			return
		}

		const loopListeners = this.loops.get(loopId)

		if (!loopListeners) {
			return
		}

		loopListeners.forEach((listener) => listener.onNotification(notification.getLoop().getContext()))
	}
}
