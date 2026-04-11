import { BaseCondition } from "src/domain/context-engine/condition/base-condition"
import { Context } from "src/domain/context/context"

export class FunctionCallCondition extends BaseCondition<Context> {
	isSatisfiedBy(candidate: Context): boolean {
		const fCall = candidate.getItems().find((item) => item.getType() === "function_call")
		return fCall !== undefined
	}
}
