import { InferenceSession } from "../session"

export interface LLMRequestMapper<R> {
	map(session: InferenceSession): R
}
