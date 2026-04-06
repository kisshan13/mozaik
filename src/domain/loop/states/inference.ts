import { Loop } from "@loop/loop"
import { CommandManager, InferenceRun } from "src/domain/commands/command-sender"
import { InferenceCommandManager, InferenceCommandSender } from "src/domain/commands/inference"
import { LoopContext } from "src/domain/loop/loop-context"
import { LoopState } from "src/domain/loop/loop-state"
import { InferenceNotificationListener, InferenceNotificationPublisher } from "src/domain/notifications/inference"

export enum InferenceNotification {
	COMPLETION_RECEIVED = "inference.completion.received",
	COMPLETED = "inference.completed",
	ERROR = "inference.error",
}

export class CompletionReceivedListener implements InferenceNotificationListener {
	onNotification(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class InferenceCompletedListener implements InferenceNotificationListener {
	onNotification(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class InferenceErrorListener implements InferenceNotificationListener {
	onNotification(loopContext: LoopContext): void {
		console.log("Inference: Context updated", loopContext)
	}
}

export class Inference implements LoopState {
	private notificationPublisher: InferenceNotificationPublisher
	private commandSender: InferenceCommandSender

	constructor(notificationPublisher: InferenceNotificationPublisher) {
		this.notificationPublisher = notificationPublisher
		this.commandSender = new InferenceCommandManager()
	}

	run(loop: Loop): void {
		const loopContext = loop.getLoopContext()
		if (!loopContext.prompt) {
			throw new Error("Inference: Prompt is required")
		}

		this.notificationPublisher.subscribe(
			InferenceNotification.COMPLETION_RECEIVED,
			new CompletionReceivedListener(),
		)

		this.notificationPublisher.subscribe(InferenceNotification.COMPLETED, new InferenceCompletedListener())
		this.notificationPublisher.subscribe(InferenceNotification.ERROR, new InferenceErrorListener())

		this.commandSender.send(loop.getId(), new InferenceRun(loop))
	}
}
