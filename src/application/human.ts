import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { InputCapable } from "@domain/agentic-environment/capabilities"
import { InputItemSource } from "@domain/agentic-environment/input-source"
import { Participant } from "@domain/agentic-environment/participant"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { DeveloperMessageItem } from "@domain/model-context/context-item/client-item/developer-message"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"

export class BaseHumanParticipant extends Participant implements InputCapable {
	private inputSource: InputItemSource

	constructor(inputSource: InputItemSource) {
		super()
		this.inputSource = inputSource
	}

    onFunctionCall(item: FunctionCallItem): Promise<void> {
        return Promise.resolve()
    }

    onExternalFunctionCall(source: Participant, item: FunctionCallItem): Promise<void> {
        return Promise.resolve()
    }

    onContextItem(source: Participant, item: ContextItem): Promise<void> {
        return Promise.resolve()
    }

    onFunctionCallOutput(item: FunctionCallOutputItem): Promise<void> {
        return Promise.resolve()
    }

    onExternalFunctionCallOutput(source: Participant, item: FunctionCallOutputItem): Promise<void> {
        return Promise.resolve()
    }

    onReasoning(item: ReasoningItem): Promise<void> {
        return Promise.resolve()
    }

    onExternalReasoning(source: Participant, item: ReasoningItem): Promise<void> {
        return Promise.resolve()
    }

    onModelMessage(item: ModelMessageItem): Promise<void> {
        return Promise.resolve()
    }

    onExternalModelMessage(source: Participant, item: ModelMessageItem): Promise<void> {
        return Promise.resolve()
    }

    onUserMessage(item: UserMessageItem): Promise<void> {
        return Promise.resolve()
    }

    onExternalUserMessage(source: Participant, item: UserMessageItem): Promise<void> {
        return Promise.resolve()
    }

    onDeveloperMessage(item: DeveloperMessageItem): Promise<void> {
        return Promise.resolve()
    }

    onExternalDeveloperMessage(source: Participant, item: DeveloperMessageItem): Promise<void> {
        return Promise.resolve()
    }

    onSystemMessage(item: SystemMessageItem): Promise<void> {
        return Promise.resolve()
    }

    onExternalSystemMessage(source: Participant, item: SystemMessageItem): Promise<void> {
        return Promise.resolve()
    }

    async streamInput(environment: AgenticEnvironment): Promise<void> {
		if (!this.isJoinedTo(environment)) return


		const stream = this.inputSource.stream()
		for await (const item of stream) {

			if (item.type === 'message' && item.role === 'user') {
				await environment.deliverUserMessage(this, item)
			}else if (item.type === 'message' && item.role === 'developer') {
				await environment.deliverDeveloperMessage(this, item)
			}else if (item.type === 'message' && item.role === 'system') {
				await environment.deliverSystemMessage(this, item)
			}
		}
	}
}
