import { BaseSpecification } from "@domain/specification/specification/specification"
import { FunctionCallOutput } from "../context-item/client-item/function-call-output"
import { ModelContext } from "../model-context"

export class FunctionCallOutputPresentSpec extends BaseSpecification<ModelContext> {
	isSatisfiedBy(context: ModelContext): boolean {
		const lasteItem = context.getLastItem()
		return lasteItem instanceof FunctionCallOutput
	}
}
