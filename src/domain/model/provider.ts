import { Inference } from "../inference/inference"
import { Interaction } from "../interaction"

export interface InferenceProvider {
	generate(request: Interaction): Promise<Inference>
}
