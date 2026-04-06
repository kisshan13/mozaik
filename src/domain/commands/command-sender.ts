import { Loop } from "@loop/loop"

export enum CommandType {
	INFERENCE_RUN = "inference.run",
}

export abstract class Command {
	constructor(public readonly type: CommandType) {}
}

export class InferenceRun extends Command {
	constructor(public readonly loop: Loop) {
		super(CommandType.INFERENCE_RUN)
	}
}

export abstract class CommandHandler {
	abstract handle(loopId: string, command: Command): void
}

export class CommandSender<T extends Command> {
	private commandHandlers: Map<string, CommandHandler[]> = new Map()

	subscribe(loopId: string, handler: CommandHandler): void {
		if (!this.commandHandlers.has(loopId)) {
			this.commandHandlers.set(loopId, [])
		}

		this.commandHandlers.get(loopId)!.push(handler)
	}

	send(loopId: string, command: T): void {
		if (!this.commandHandlers.has(loopId)) {
			return
		}

		this.commandHandlers.get(loopId)!.forEach((handler) => handler.handle(loopId, command))
	}
}
