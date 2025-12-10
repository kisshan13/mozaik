import { ResponseHandler } from "@core/response-handler"

export class OutputParsedHandler extends ResponseHandler {

    nextHandler!: ResponseHandler


    handle(response: any) {

        if(response.output_parsed){
            return response.output_parsed
        }

        return this.nextHandler.handle(response)
    }
}