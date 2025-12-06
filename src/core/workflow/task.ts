import { Model, Command, Agent } from "@/index"
import { WorkUnit } from "@core/workflow/work-unit"

export class Task extends WorkUnit {

    constructor(private task: string, private model: Model){
        super()
    }

    async execute(): Promise<any> {
      	const mosaic: Command = {
            model: this.model,
            task: this.task
        }

        console.log(`Calling llm with parameters: ${JSON.stringify(mosaic)}`)

        const agent = new Agent(mosaic)
        return await agent.act(this.task)
    }
}
