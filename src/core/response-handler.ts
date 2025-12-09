export abstract class ResponseHandler {

    abstract nextHandler: ResponseHandler

    setNextHandler(responseHandler: ResponseHandler) : ResponseHandler {
        this.nextHandler = responseHandler
        return this.nextHandler
    }

    abstract handle(request: any, response: any): any
}