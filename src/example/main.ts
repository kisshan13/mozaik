import "dotenv/config"
import { ResponseCreateParamsNonStreaming } from "openai/resources/responses/responses"
import { MaxTokensPolicy } from "./max-tokens-policy"
import { Gpt54Model } from "./gpt-5-4"

async function main() {
	const request: ResponseCreateParamsNonStreaming = {
		input: "Write me a poem about a cats",
		include: ["message.output_text.logprobs"],
	}
	const policy = new MaxTokensPolicy()
	const model = new Gpt54Model(undefined)
	await model.call(request)
}

main()
