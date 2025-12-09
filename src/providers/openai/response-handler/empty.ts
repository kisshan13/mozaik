import { ResponseHandler } from "@core/response-handler"

export class EmptyResponseHandler extends ResponseHandler {

    nextHandler!: ResponseHandler

    handle(response: any) {
        return ""
    }
}