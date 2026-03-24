import { Inference } from "../inference/inference"

export interface InferenceProvider<Interaction> {
	generate(request: Interaction): Promise<Inference>
}
