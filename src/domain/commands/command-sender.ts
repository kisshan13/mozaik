export enum CommandType {
	INFERENCE_RUN = "inference.run",
}

export abstract class Command {
	constructor(public readonly type: CommandType) {}
}

export class InferenceRun extends Command {
	constructor(public readonly prompt: string) {
		super(CommandType.INFERENCE_RUN)
	}
}

export abstract class CommandListener {
	abstract onCommand(loopId: string, command: Command): void
}

export class CommandSender<T extends Command> {
	private loops: Map<string, CommandListener[]> = new Map()

	subscribe(loopId: string, listener: CommandListener): void {
		if (!this.loops.has(loopId)) {
			this.loops.set(loopId, [])
		}

		this.loops.get(loopId)!.push(listener)
	}

	send(loopId: string, command: T): void {
		if (!this.loops.has(loopId)) {
			return
		}

		this.loops.get(loopId)!.forEach((listener) => listener.onCommand(loopId, command))
	}
}
