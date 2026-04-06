import { CommandHandler } from "./handler"
import { Command } from "./sender"

export interface CommandSubscription<T extends Command> {
	subscribe(loopId: string, handler: CommandHandler<T>): void
}