import { ResponseHandler } from "@core/response-handler"

export class ParsedOutputHandler extends ResponseHandler {

    nextHandler!: ResponseHandler


    handle(request: any, response: any) {

		if(response.parsed_output){
			return response.parsed_output
		}

        this.nextHandler.handle(request, response)
    }
}