import { InferenceSession } from "../session"

export interface ModelRequestMapper<R> {
	map(session: InferenceSession): R
}
