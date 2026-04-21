import { ModelMessage } from "@core/context/output/model-message"
import { Complete, Fail, RuntimeContext, State, StateId, Transition } from "../runtime"
import { ModelMessageHandler } from "../handler"

export class ModelMessageState implements State {
	id: StateId = StateId.MODEL_MESSAGE_HANDLER
	handler: ModelMessageHandler

	constructor(handler: ModelMessageHandler) {
		this.handler = handler
	}

	async run(runtime: RuntimeContext): Promise<Transition> {
		try {
			if (!runtime.modelMessage) {
				throw new Error("Model message not found")
			}
			await this.handler.handle(runtime.execution.executionId, runtime.modelMessage as ModelMessage)
			return new Complete(runtime.modelMessage.content.text)
		} catch (error) {
			return new Fail((error as Error).message)
		}
	}
}
