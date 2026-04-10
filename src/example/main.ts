import "dotenv/config"
import { MaxTokensPolicy } from "./max-tokens-policy"
import { Gpt54Model } from "./gpt-5-4"
import { zodTextFormat } from "openai/helpers/zod"
import z from "zod"

async function main() {
	const request: any = {
		input: [
			{
				role: "user",
				content: [
					{
						type: "input_text",
						text: "Write me a poem about a cats",
					},
				],
			},
		],
		include: ["message.output_text.logprobs"],
		text: {
			format: zodTextFormat(
				z.object({
					poem: z.string(),
				}),
				"poem",
			),
		},
	}
	const policy = new MaxTokensPolicy()
	const model = new Gpt54Model(undefined)
	await model.stream(request)
}

main()
