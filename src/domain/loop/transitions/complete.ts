import { Transition } from "src/domain/loop/transition"
import { Context } from "@loop/context"

export class Complete implements Transition {
	result: string
	constructor(result: string) {
		this.result = result
	}

	async apply(Context: Context): Promise<void> {
	}
}
