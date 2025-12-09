import { SendingClient } from "./client"
import { DefaultClient } from "./default"
import { StructuredOutputClient } from "./structured-output"

export class ClientResolver {

    static resolve(request: any): SendingClient {

        if(request.text && request.text.format){
            return new StructuredOutputClient()
        }else{
            return new DefaultClient()
        }
    }
}