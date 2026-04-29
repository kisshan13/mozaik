import { AgenticEnvironment } from "./agentic-environment"
import { ContextItem } from "@domain/model-context/context-item/context-item"

export abstract class Participant {

	private environments: AgenticEnvironment[] = []

	join(environment: AgenticEnvironment) {
		if (this.isJoinedTo(environment)) {
			return
		}
		environment.subscribe(this)
		this.environments.push(environment)
	}

	leave(environment: AgenticEnvironment) {
		if (!this.isJoinedTo(environment)) {
			return
		}
		environment.unsubscribe(this)
		this.environments = this.environments.filter((e) => e !== environment)
	}

	protected isJoinedTo(environment: AgenticEnvironment): boolean {
		return this.environments.includes(environment)
	}

	abstract onContextItem(source: Participant, item: ContextItem): Promise<void>
}
