import { InferenceSession } from "../agent/session"

export interface ModelRequestMapper<R> {
	map(session: InferenceSession): R
}
