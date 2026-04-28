import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"

export abstract class Participant {
	abstract onFunctionCallOutput(participant: Participant, item: FunctionCallOutputItem): Promise<void>

	abstract onMessage(participant: Participant, message: string): Promise<void>

	abstract onFunctionCall(participant: Participant, item: FunctionCallItem): Promise<void>

	abstract onReasoning(participant: Participant, item: ReasoningItem): Promise<void>

	abstract onOutputMessage(participant: Participant, item: ModelMessageItem): Promise<void>
}
