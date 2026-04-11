import "dotenv/config"
import { FunctionCallCondition } from "./funcion-call-condtionion"
import { Gpt54Model } from "./gpt-5-4"

async function main() {
	const request: any = {
		//include: ["reasoning.encrypted_content"],
		input: [
			{
				id: "msg_0f77fc6162e828830069d8fb32aba8819f82484616cb16b892",
				status: "stat",
				role: "user",
				type: "message",
				content: [
					{
						type: "input_text",
						text: "Write me a poem about a cats",
					},
				],
			},
			{
				id: "fc_0f77fc6162e828830069d8fb32aba8819f82484616cb16b892",
				call_id: "fc_0f77fc6162e828830069d8fb32aba8819f82484616cb16b892",
				type: "function_call",
				name: "reduce_poem",
				arguments: "100",
			},
			{
				type: "function_call_output",
				call_id: "fc_0f77fc6162e828830069d8fb32aba8819f82484616cb16b892",
				id: "fc_output_0f77fc6162e828830069d8fb32aba8819f82484616cb16b892",
				output: [
					{
						type: "input_text",
						text: `A cat walks softly through the noon,  \n' +
    'A whiskered stitch beneath the moon  \n' +
    'Of daylight pooled on kitchen tile,  \n' +
    'With amber eyes and secret smile.\n' +
    '\n' +
    'It curls where golden sunbeams lie,  \n' +
    'Then wakes as if to greet a fly,  \n' +
    'A velvet paw, a sudden leap,  \n' +
    'Then back again to royal sleep.\n' +
    '\n' +
    'It speaks in purrs, in blinks, in grace,  \n' +
    'In quiet claim of chair and space,  \n' +
    'A tiny king, a furry art,  \n' +
    'With mischief tucked inside its heart.\n' +
    '\n' +
    'And when the world feels hard and flat,  \n' +
    'There’s comfort in the shape of cat.`,
					},
				],
			},
			{
				role: "user",
				content: [
					{
						type: "input_text",
						text: "Reduce the poem to 100 characters.",
					},
				],
			},
			{
				id: "rs_0f77fc6162e828830069d8fb32aba8819f82484616cb16b892",
				type: "reasoning",
				summary: [],
			},
		],
	}
	const condition = new FunctionCallCondition()
	const model = new Gpt54Model(condition)
	await model.call(request)
}

main()
