export interface GenerativeModel {
	generate(prompt: string): Promise<string>
}
