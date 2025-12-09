import { SendingClient } from "@core/endpoint/client"
import { AnthropicDefaultClient } from "./default"
import { AnthropicParserClient } from "./parser"

export class AnthropicClientResolver {

    static resolve(request: any): SendingClient {

        if(request.output_format){
            return new AnthropicParserClient()
        }else{
            return new AnthropicDefaultClient()
        }
    }
}