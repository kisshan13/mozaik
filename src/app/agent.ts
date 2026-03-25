import { Inference } from "@/domain/inference/inference"
import { Interaction } from "@/domain/interaction"
import { Interpreter } from "@/domain/interpreter"
import { InferenceProvider } from "@/domain/model/provider"
import { Participant } from "@/domain/participant"
import { FeedbackPhase, InferencePhase, IntentPhase, PerceivePhase } from "@/domain/phase"

export class Gpt5_4 implements InferenceProvider {
	async generate(interaction: Interaction): Promise<Inference> {
		const contextWindow = new ContextWindow(1000, 1000, 1000)
		return new Inference("The answer is 42.", contextWindow, new Date(), "The answer is 42.")
	}
}
const interpreter = new Interpreter()
interpreter.addPhase(new PerceivePhase())
interpreter.addPhase(new InferencePhase(new Gpt5_4()))
interpreter.addPhase(new IntentPhase())
interpreter.addPhase(new FeedbackPhase())

const agent = new Participant("agent", interpreter)
