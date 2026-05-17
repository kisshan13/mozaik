export interface InputStream {
	stream(signal?: AbortSignal): AsyncIterable<string>
}
