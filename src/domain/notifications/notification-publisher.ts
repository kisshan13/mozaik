import { LoopContext } from "@loop/loop-context"
import { NotificationListener } from "./notification-listener"

export class NotificationPublisher<T> {
	private loops: Map<string, NotificationListener[]> = new Map()

	subscribe(loopId: string, listener: NotificationListener): void {
		if (!this.loops.has(loopId)) {
			this.loops.set(loopId, [])
		}

		this.loops.get(loopId)!.push(listener)
	}

	notify(loopId: string, loopContext: LoopContext): void {
		if (!this.loops.has(loopId)) {
			return
		}

		const loopListeners = this.loops.get(loopId)

		if (!loopListeners) {
			return
		}

		loopListeners.forEach((listener) => listener.onNotification(loopContext))
	}
}
