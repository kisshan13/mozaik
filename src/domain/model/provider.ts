import { Inference } from "../inference/inference"

export interface LLMProvider<R> {
	generate(request: R): Promise<Inference>
}
