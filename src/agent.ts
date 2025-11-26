import { RequestGateway } from "@core/request-gateway"
import { Command } from "./types/command"
import { MosaicEndpointResolver } from "@providers/endpoint-resolver"
import { Message } from "./types/message"
import { Model } from "./types/model"
import z from "zod"

export class Agent {

    private command: Command
    gateway: RequestGateway = new RequestGateway(new MosaicEndpointResolver())

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

    setStructuredOutput(schema: z.ZodObject<any>){
        this.command.structuredOutput = schema
    }

    async act(task?: string){
        if(task){
            this.command.task = task
        }
        return await this.gateway.invoke(this.command)
    }
}