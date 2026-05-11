import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { AgenticEnvironment } from "./agentic-environment"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { DeveloperMessageItem } from "@domain/model-context/context-item/client-item/developer-message"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"

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

	getEnvironments(): AgenticEnvironment[] {
		return this.environments
	}

	// abstract onParticipantJoined(participant: Participant): Promise<void>

	// abstract onParticipantLeft(participant: Participant): Promise<void>

	abstract onFunctionCall(item: FunctionCallItem): Promise<void>

	abstract onExternalFunctionCall(source: Participant, item: FunctionCallItem): Promise<void>

	abstract onFunctionCallOutput(item: FunctionCallOutputItem): Promise<void>

	abstract onExternalFunctionCallOutput(source: Participant, item: FunctionCallOutputItem): Promise<void>

	abstract onReasoning(item: ReasoningItem): Promise<void>

	abstract onExternalReasoning(source: Participant, item: ReasoningItem): Promise<void>

	abstract onModelMessage(item: ModelMessageItem): Promise<void>

	abstract onExternalModelMessage(source: Participant, item: ModelMessageItem): Promise<void>

	abstract onUserMessage(item: UserMessageItem): Promise<void>

	abstract onExternalUserMessage(source: Participant, item: UserMessageItem): Promise<void>

	abstract onDeveloperMessage(item: DeveloperMessageItem): Promise<void>

	abstract onExternalDeveloperMessage(source: Participant, item: DeveloperMessageItem): Promise<void>

	abstract onSystemMessage(item: SystemMessageItem): Promise<void>

	abstract onExternalSystemMessage(source: Participant, item: SystemMessageItem): Promise<void>
}
