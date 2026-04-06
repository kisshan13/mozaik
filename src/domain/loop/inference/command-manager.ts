import { CommandSender } from "src/domain/command/sender"
import { InferenceRun } from "./command"
import { CommandHandler } from "src/domain/command/handler"
import { CommandManager } from "src/domain/command/manager"

export type InferenceCommandSender = CommandSender<InferenceRun>

export class InferenceCommandManager extends CommandManager<InferenceRun> {
	subscribe(loopId: string, handler: CommandHandler<InferenceRun>): void {
		console.log("InferenceCommandSender: Subscribing to loop", loopId)
		super.subscribe(loopId, handler)
	}

	send(loopId: string, command: InferenceRun): void {
		console.log("InferenceCommandSender: Sending command to loop", loopId)
		super.send(loopId, command)
	}
}
