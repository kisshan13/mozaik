export enum InferenceEvent {
	REQUESTED = "inference.requested",
}

export enum InferenceSignal {
	COMPLETION_RECEIVED = "inference.completion.received",
	COMPLETED = "inference.completed",
	ERROR = "inference.error",
}
