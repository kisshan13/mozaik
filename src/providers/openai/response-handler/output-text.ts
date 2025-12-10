import { ResponseHandler } from "@core/response-handler"

export class OutputTextHandler extends ResponseHandler {

    nextHandler!: ResponseHandler


    handle(response: any) {

        if (response.output_text) {
            return response.output_text
        }

        return this.nextHandler.handle(response)
    }
}