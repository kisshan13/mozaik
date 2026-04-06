import { Context } from "@loop/context"

export abstract class NotificationListener {
	abstract onNotification(Context: Context): void
}
