import { BaseSpecification } from "@domain/specification/specification/specification"
import { ModelContext } from "../model-context"
import { ModelMessage } from "../context-item/model-item/model-message"

export class ModelRespondedSpecification extends BaseSpecification<ModelContext> {
	isSatisfiedBy(context: ModelContext): boolean {
		if (context.getItems().length === 0) {
			return false
		}
		const lastItem = context.getItems()[context.getItems().length - 1]
		return lastItem instanceof ModelMessage && lastItem.role === "assistant"
	}
}
