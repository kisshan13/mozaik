import { Inference } from "../inference"
import { Interaction } from "../../hypervisor/interaction"

export interface InferenceProvider {
	generate(request: Interaction): Promise<Inference>
}
