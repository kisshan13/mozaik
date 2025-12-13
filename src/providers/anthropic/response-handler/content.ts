import { ResponseHandler } from "@core/endpoint/response-handler"

export class ContentHandler extends ResponseHandler {

    nextHandler!: ResponseHandler


    handle(response: any) {
        
        return response.content
			.filter((block: any) => block.type === 'text')
			.map((block: any) => block.type === 'text' ? block.text : '')
			.join('')
    }
}