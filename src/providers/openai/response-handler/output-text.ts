import { ResponseHandler } from "@core/response-handler"

export class OutputTextHandler extends ResponseHandler {

    nextHandler!: ResponseHandler


    handle(request: any, response: any) {

        if (response.output_text) {
            return response.output_text
        }

        this.nextHandler.handle(request, response)
    }
}