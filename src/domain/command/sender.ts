export class CommandType {
	static readonly INFERENCE_RUN = "inference.run"
}

export abstract class Command {
	constructor(public readonly type: CommandType) {}
}

export interface CommandSender<T extends Command> {
	send(loopId: string, command: T): void
}
