import { CapabilityKind, Descriptor } from "../../descriptor"
import { Model } from "../model"
import { Gpt5NanoRequest } from "./gpt-5-nano-request"
  
export class Gpt5Nano implements Model<Gpt5NanoRequest> {
    
    readonly desc: Descriptor = {
        model: "gpt-5-nano",
        supports: new Set<CapabilityKind>(["text","vision"]),
        maxContext: 400_000,
        pricing: { 
            type: 'per-1m-tokens',
            input: 0.05, 
            output: 0.4 
        },
    }
    
    request() { 
        return new Gpt5NanoRequest(this.desc) 
    }
}