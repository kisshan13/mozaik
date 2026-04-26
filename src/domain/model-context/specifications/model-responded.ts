import { BaseSpecification } from "@domain/specification/specification/specification"
import { ModelContext } from "../model-context"
import { ModelMessageItem } from "../context-item/model-item/model-message"

export class ModelRespondedSpec extends BaseSpecification<ModelContext> {
	isSatisfiedBy(context: ModelContext): boolean {
		if (context.getItems().length === 0) {
			return false
		}
		const lastItem = context.getLastItem()
		return lastItem instanceof ModelMessageItem && lastItem.role === "assistant"
	}
}
