import { BaseCondition } from "@core/context-engine/condition/base-condition"
import { Action, Rule } from "@core/context-engine/rule/rule"
import { Context } from "@core/context-runtime/context"

export class FunctionCallCondition extends BaseCondition<Context> {
	isSatisfiedBy(candidate: Context): boolean {
		const fCall = candidate.getItems().find((item) => item.getType() === "function_call")
		return fCall !== undefined
	}
}

export class ConsoleLogger<T> implements Action<T> {
	apply(candidate: T): T {
		console.log(candidate)
		return candidate
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