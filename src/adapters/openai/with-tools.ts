import OpenAI from "openai/index"
import { GenOpts, Message, ToolSpec, ToolUse } from "../../core/capabilities"
import { OpenAIMessageMapper } from "../../mappers/openai/message-mapper"
import { OpenAIModel } from "../../core/model"
import { ChatCompletionMessageParam, ChatCompletionMessageToolCall } from "openai/resources/chat/completions/completions"

export class OpenAITools implements ToolUse {

    constructor(private model: OpenAIModel, private client = new OpenAI(), private mapper = new OpenAIMessageMapper() ) {}

    async withTools(messages: Message[], tools: ToolSpec[], opts?: GenOpts) {
 
        const oaiMsgs = this.mapper.toProvider(messages)
        const r = await this.client.chat.completions.create({
            model: this.model,
            messages: oaiMsgs,
            tools: tools.map(t => ({ type: "function", function: { name: t.name, description: t.description, parameters: t.schema } })), 
            tool_choice: "auto",
            temperature: opts?.temperature,
            max_tokens: opts?.maxTokens,
        })

        const aMsg = r.choices?.[0]?.message
        const calls = aMsg?.tool_calls ?? []
      
        // If the model didn’t call tools, we already have the final text
        if (!calls.length) {
            return { 
                text: aMsg?.content ?? "", 
                toolCalls: [] as any[] 
            }
        }

        // 2) Execute tool calls (narrow the union on tc.type)
        const indexByName = new Map(tools.map((t) => [t.name, t]))
        const toolResults: ChatCompletionMessageParam[] = []

        await Promise.all(
            calls.map(async (tc: ChatCompletionMessageToolCall) => {
                if (tc.type !== "function") return // ignore custom tools if you don't support them

                const name = tc.function.name
                const rawArgs = tc.function.arguments ?? "{}"
                let args: any
                try { args = JSON.parse(rawArgs) } catch { args = { _raw: rawArgs } }

                const tool = indexByName.get(name)
                if (!tool) throw new Error(`No handler for tool: ${name}`)

                const result = await tool.invoke(args)
                toolResults.push({
                    role: "tool",
                    tool_call_id: tc.id,                     // IMPORTANT: must match
                    content: typeof result === "string" ? result : JSON.stringify(result),
                })
            })
        )

        // 3) Second call: include the assistant tool-call msg AND your tool result msgs
        const followup = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                ...oaiMsgs,
                aMsg!,            // the assistant message that contained tool_calls
                ...toolResults,   // your tool outputs, one per call
            ],
            temperature: opts?.temperature,
            max_tokens: opts?.maxTokens,
        })

        const finalMsg = followup.choices[0]?.message

        return {
            text: finalMsg?.content ?? "",
            toolCalls: calls
            .filter((tc): tc is Extract<typeof tc, { type: "function" }> => tc.type === "function")
            .map((tc) => ({
                id: tc.id,
                name: tc.function.name,
                args: safeParse(tc.function.arguments),
            })),
        }
    }
}

function safeParse(s?: string) {

    if (!s) return {}
    
    try { 
        return JSON.parse(s) 
    } 
    catch { 
        return { _raw: s } 
    }
}