import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { Participant } from "@domain/agentic-environment/participants/participant"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelContext } from "@domain/model-context/model-context"
import { GenerativeModel } from "@domain/generative-model/generative-model"

export abstract class Agent extends Participant {
	abstract executeFunctionCall(
		environment: AgenticEnvironment,
		functionCallItem: FunctionCallItem,
		signal?: AbortSignal,
	): Promise<void>

	abstract runInference(
		environment: AgenticEnvironment,
		context: ModelContext,
		model: GenerativeModel,
		signal?: AbortSignal,
	): Promise<void>
}
