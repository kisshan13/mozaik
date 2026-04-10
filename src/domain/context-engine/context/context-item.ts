

export type Role = "user" | "system" | "assistant" | "developer"
export type ModelContent = "output_text" | "function_call"

export type UserContentType = "input_text"

export class UserContent {
	readonly type: UserContentType
	constructor(type: UserContentType) {
		this.type = type
	}
}	

export class InputTextContent extends UserContent {
	constructor(public readonly text: string) {
		super("input_text")
	}
}

export type Content = UserContent | ModelContent

export abstract class ContextItem {
	readonly role: Role
	readonly content: Content

	constructor(role: Role, content: Content) {
		this.role = role
		this.content = content
	}
}

export class UserMessage extends ContextItem {
	constructor(content: UserContent) {
		super("user", content)
	}
}

export class ModelMessage extends ContextItem {
	constructor(content: ModelContent) {
		super("assistant", content)
	}
}
