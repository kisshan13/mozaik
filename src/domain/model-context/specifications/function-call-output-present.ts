import { BaseSpecification } from "@domain/specification/specification/specification"
import { FunctionCallOutputItem } from "../context-item/client-item/function-call-output"
import { ModelContext } from "../model-context"

export class FunctionCallOutputPresentSpec extends BaseSpecification<ModelContext> {
	isSatisfiedBy(context: ModelContext): boolean {
		const lasteItem = context.getLastItem()
		return lasteItem instanceof FunctionCallOutputItem
	}
}
