import { ResponseHandler } from "@core/endpoint/response-handler"

export class EmptyResponseHandler extends ResponseHandler {

    nextHandler!: ResponseHandler

    handle(response: any) {
        return ""
    }
}