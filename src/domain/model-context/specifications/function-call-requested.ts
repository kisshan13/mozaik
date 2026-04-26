import { BaseSpecification } from "@domain/specification/specification/specification"
import { ModelContext } from "../model-context"
import { FunctionCallItem } from "../context-item/model-item/function-call"

export class FunctionCallRequestedSpec extends BaseSpecification<ModelContext> {
	isSatisfiedBy(context: ModelContext): boolean {
		if (context.getItems().length === 0) {
			return false
		}
		const lastItem = context.getLastItem()
		return lastItem instanceof FunctionCallItem
	}
}
