import { ResponseHandler } from "@core/response-handler"

export class EmptyResponseHandler extends ResponseHandler {

    nextHandler!: ResponseHandler

    handle(request: any, response: any) {
        return ""
    }
}