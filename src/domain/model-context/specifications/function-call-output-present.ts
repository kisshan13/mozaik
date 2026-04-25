import { BaseSpecification } from "@domain/specification/specification/specification"
import { FunctionCallOutput } from "../context-item/client-item/function-call-output"
import { ModelContext } from "../model-context"

export class FunctionCallOutputPresentSpecification extends BaseSpecification<ModelContext> {
	isSatisfiedBy(context: ModelContext): boolean {
		const lasteItem = context.getItems()[context.getItems().length - 1]
		return lasteItem instanceof FunctionCallOutput
	}
}
