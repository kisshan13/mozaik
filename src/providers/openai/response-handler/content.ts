import { ResponseHandler } from "@core/response-handler"

export class ContentHandler extends ResponseHandler {

    nextHandler!: ResponseHandler


    handle(response: any) {

        const firstOutput = response.output?.[0]
        if (firstOutput && 'content' in firstOutput) {
            const firstContent = firstOutput.content?.[0]
            if (firstContent && 'text' in firstContent) {
                return firstContent.text
            }
        }

        return this.nextHandler.handle(response)
    }
}