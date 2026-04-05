import { LoopContext } from "@loop/loop-context"

export abstract class NotificationListener {
	abstract onNotification(loopContext: LoopContext): void
}
