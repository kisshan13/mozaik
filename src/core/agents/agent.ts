import { RequestGateway } from "@core/endpoint/request-gateway"
import { Command } from "@/types/command"
import { DefaultEndpointResolver } from "@providers/endpoint-resolver"
import { ZodObject } from "zod"
import { Model } from "@/types/model"
import { Message } from "@/types/message"

export class Agent {

    private command: Command
    gateway: RequestGateway = new RequestGateway(new DefaultEndpointResolver())

    constructor(command: Command){
        this.command = command
    }

    setModel(model: Model){
        this.command.model = model
    }

    setMessages(messages: Message[]){
        this.command.messages = messages
    }

    setTask(task: string){
        this.command.task = task
    }

    setStructuredOutput(schema: ZodObject<any>){
        this.command.structuredOutput = schema
    }

    async act(task?: string){
        if(task){
            this.command.task = task
        }
        return await this.gateway.invoke(this.command)
    }
}