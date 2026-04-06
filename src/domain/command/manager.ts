import { CommandHandler } from "./handler"
import { Command, CommandSender } from "./sender"
import { CommandSubscription } from "./subscription"

export class CommandManager<T extends Command> implements CommandSubscription<T>, CommandSender<T> {
	private commandHandlers: Map<string, CommandHandler<T>[]> = new Map()

	subscribe(loopId: string, handler: CommandHandler<T>): void {
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