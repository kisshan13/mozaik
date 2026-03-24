import { Interaction } from "@/domain/interaction"
import { Interpreter } from "@/domain/interpreter"
import { InferenceProvider } from "@/domain/model/provider"
import { Participant } from "@/domain/participant"
import { FocusPhase, InferencePhase, IntentPhase, InteractPhase } from "@/domain/phase"

export class Agent extends Participant {
	interpreter: Interpreter = new Interpreter()

	constructor(inferenceProvider: InferenceProvider<Interaction>) {
		super()
		this.interpreter.addPhase(new FocusPhase())
		this.interpreter.addPhase(new InferencePhase(inferenceProvider))
		this.interpreter.addPhase(new IntentPhase())
		this.interpreter.addPhase(new InteractPhase())
	}
}
