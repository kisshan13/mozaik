import { Loop } from "@loop/loop"
import { Command, CommandType } from "src/domain/command/sender"

export class InferenceRun extends Command {
	constructor(public readonly loop: Loop) {
		super(CommandType.INFERENCE_RUN)
	}
}
