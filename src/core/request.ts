import { Message } from "@/types/messages"

export class BaseRequest {
    model: string

    constructor(model: string){
        this.model = model
    }
}

export class ChatRequest extends BaseRequest { 
    constructor(readonly prompt: string, readonly model: string, readonly messages: Message[] = []) {
        super(model)
    }
}

export class TaskRequest extends BaseRequest { 
    constructor(readonly task: string, readonly steps: string[], readonly model: string) {
        super(model)
    } 
}