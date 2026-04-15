import { BaseCondition } from "@core/context-engine/condition/base-condition"
import { Action, Rule } from "@core/context-engine/rule/rule"
import { Context } from "@core/context-runtime/context"
import { ReasoningEffort } from "@core/generative-model/capabilities/reasoning-effort"
import { InferenceRequest } from "@core/generative-model/inference-request"

export class FunctionCallCondition extends BaseCondition<Context> {
	isSatisfiedBy(candidate: Context): boolean {
		const fCall = candidate.getItems().find((item) => item.getType() === "function_call")
		return fCall !== undefined
	}
}

export class ConsoleLogger<T> implements Action<T, void> {
	apply(candidate: T): void {
		console.log(candidate)
	}
}

const rule = new Rule({
	when: new FunctionCallCondition(),
	then: new ConsoleLogger(),
})

rule.apply({
	items: [
		{
			type: "function_call",
			name: "reduce_poem",
			arguments: "100",
		},
	],
})