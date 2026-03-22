import { InferenceSession } from "../inference/session"

export interface LLMRequestMapper<R> {
	map(session: InferenceSession): R
}
