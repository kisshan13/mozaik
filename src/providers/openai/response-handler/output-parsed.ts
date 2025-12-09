import { ResponseHandler } from "@core/response-handler"

export class OutputParsedHandler extends ResponseHandler {

    nextHandler!: ResponseHandler


    handle(request: any, response: any) {

        if(response.output_parsed){
            return response.output_parsed
        }

        this.nextHandler.handle(request, response)
    }
}