export interface TextPart {
	type: "text"
	text: string
}

export interface ImagePart {
	type: "image_url"
	url: string
}

export interface Message {
	role: "system" | "user" | "assistant" | "tool"
	content: string | Array<TextPart | ImagePart>
}
