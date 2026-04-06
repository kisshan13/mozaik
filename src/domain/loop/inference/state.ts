import { Loop } from "@loop/loop"
import { InferenceRun } from "./command"
import { InferenceCommandSender } from "@loop/inference/command-manager"
import { Context } from "@loop/context"
import { LoopState } from "src/domain/loop/loop-state"
import { InferenceNotificationListener, InferenceNotificationPublisher } from "src/domain/notifications/inference"
import { InferenceErrorListener } from "./listeners/error"

export enum InferenceNotification {
	COMPLETION_RECEIVED = "inference.completion.received",
	COMPLETED = "inference.completed",
	ERROR = "inference.error",
}

export class CompletionReceivedListener implements InferenceNotificationListener {
	onNotification(Context: Context): void {
		console.log("Inference: Context updated", Context)
	}
}

export class InferenceCompletedListener implements InferenceNotificationListener {
	onNotification(Context: Context): void {
		console.log("Inference: Context updated", Context)
	}
}

export class InferenceState implements LoopState {
	private notifications: InferenceNotificationPublisher
	private commandSender: InferenceCommandSender

	constructor(notifications: InferenceNotificationPublisher, commandSender: InferenceCommandSender) {
		this.notifications = notifications
		this.commandSender = commandSender
	}

	run(loop: Loop): void {
		const Context = loop.getContext()
		if (!Context.prompt) {
			throw new Error("Inference: Prompt is required")
		}

		this.notifications.subscribe(loop.getId(), new CompletionReceivedListener())
		this.notifications.subscribe(loop.getId(), new InferenceCompletedListener())
		this.notifications.subscribe(loop.getId(), new InferenceErrorListener())

		this.commandSender.send(loop.getId(), new InferenceRun(loop))
	}
}
