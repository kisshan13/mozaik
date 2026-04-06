import { Transition } from "src/domain/loop/transition"
import { Context } from "@loop/context"

export class Fail implements Transition {
	error: string

	constructor(error: string) {
		this.error = error
	}

	async apply(Context: Context): Promise<void> {
	}
}
