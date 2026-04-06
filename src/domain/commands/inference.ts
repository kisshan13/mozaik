import { CommandHandler, CommandSender, InferenceRun } from "./command-sender"

export class InferenceCommandSender extends CommandSender<InferenceRun> {
	subscribe(loopId: string, handler: CommandHandler): void {
		console.log("InferenceCommandSender: Subscribing to loop", loopId)
		super.subscribe(loopId, handler)
	}

	send(loopId: string, command: InferenceRun): void {
		console.log("InferenceCommandSender: Sending command to loop", loopId)
		super.send(loopId, command)
	}
}
