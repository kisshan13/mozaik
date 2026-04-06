import { Command } from "./sender"

export abstract class CommandHandler<T extends Command> {
	abstract handle(loopId: string, command: T): void
}
