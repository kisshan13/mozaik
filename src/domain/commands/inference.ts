import { CommandListener, CommandSender, InferenceRun } from "./command-sender"

export class InferenceCommandSender extends CommandSender<InferenceRun> {
	subscribe(loopId: string, listener: CommandListener): void {
		console.log("InferenceCommandSender: Subscribing to loop", loopId)
		super.subscribe(loopId, listener)
	}

	send(loopId: string, command: InferenceRun): void {
		console.log("InferenceCommandSender: Sending command to loop", loopId)
		super.send(loopId, command)
	}
}
