export interface MessageSender {
	stream(message: string, signal?: AbortSignal): AsyncIterable<string>
}
