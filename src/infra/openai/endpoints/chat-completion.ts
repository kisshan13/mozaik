import { OpenAIMapper } from "../mapper"
import { Descriptor } from "../../../core/descriptor"
import { Message } from "../../../core/message"
import { CustomToolSpec } from "../../../core/tool"
import { EndpointStrategy } from "../../../core/strategy"
import OpenAI from "openai"
import { ChatCompletionMessageParam, ChatCompletionMessageToolCall } from "openai/resources/index"

export class ChatCompletion extends EndpointStrategy {

    private request: any = {}
    private client: OpenAI
    private tools: CustomToolSpec[] = []

    constructor(modelDescriptor: Descriptor, private mapper = new OpenAIMapper()){
        super()
        this.request.model = modelDescriptor.model
        this.client = new OpenAI()
    }

    setContext(messages: Message[]): ChatCompletion { 
        const oaiMsgs = this.mapper.toMessages(messages)
        this.request = {
            ...this.request,
            messages: oaiMsgs
        }
        return this
    }

    setTools(tools: CustomToolSpec[]): ChatCompletion {
        this.tools = tools
        const oaiTools = this.mapper.toTools(tools)

        this.request = {
            ...this.request,
            tools: oaiTools,
            tool_choice: 'auto'
        }
        return this
    }

    async send(): Promise<any> {
        const r = await this.client.chat.completions.create(this.request)

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
        const indexByName = new Map(this.tools.map((t) => [t.name, t]))
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
            model: this.request.model,
            messages: [
                ...this.request.messages,
                aMsg!,            // the assistant message that contained tool_calls
                ...toolResults,   // your tool outputs, one per call
            ]
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