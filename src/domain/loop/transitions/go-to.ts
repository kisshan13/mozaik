import { Transition } from "src/domain/loop/transition"
import { Context } from "@loop/context"
import { StateId } from "src/domain/loop/loop-state"

export class GoTo implements Transition {
	next: StateId

	constructor(next: StateId) {
		this.next = next
	}

	async apply(Context: Context): Promise<void> {
	}
}
