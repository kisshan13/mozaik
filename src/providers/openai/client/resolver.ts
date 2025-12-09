import { SendingClient } from "./client"
import { DefaultClient } from "./default"
import { ParserClient } from "./parser"

export class ClientResolver {

    static resolve(request: any): SendingClient {

        if(request.text && request.text.format){
            return new ParserClient()
        }else{
            return new DefaultClient()
        }
    }
}