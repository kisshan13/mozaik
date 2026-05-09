import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { InputCapable } from "@domain/agentic-environment/capabilities"
import { InputItemSource } from "@domain/agentic-environment/input-source"
import { Participant } from "@domain/agentic-environment/participant"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { deliverStream } from "./deliver-stream"

export class BaseHumanParticipant extends Participant implements InputCapable {
	private inputSource: InputItemSource

	constructor(inputSource: InputItemSource) {
		super()
		this.inputSource = inputSource
	}

	onInternalContextItem(item: ContextItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalContextItem(source: Participant, item: ContextItem): Promise<void> {
		return Promise.resolve()
	}

	async streamInput(environment: AgenticEnvironment): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		await deliverStream(environment, this, this.inputSource.stream())
	}
}
