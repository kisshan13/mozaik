export interface EndpointRequestVisitor<R> {
    visitChat(ep: ChatCompletionEndpoint): R;
    visitResponses(ep: ResponsesEndpoint): R;
}

type NonReasoningOptions = { tools?: any[]; structuredOutput?: unknown };
type ReasoningOptions    = { tools?: any[]; structuredOutput?: unknown; reasoning: { effort: "low"|"medium"|"high" } }


export class ChatCompletionEndpoint implements Endpoint {
    send<R>(req: EndpointRequestVisitor<R>): R { return req.visitChat(this); }
    callChat(opts: NonReasoningOptions) { /* POST /chat */ }
}
  
export class ResponsesEndpoint implements Endpoint {
    send<R>(req: EndpointRequestVisitor<R>): R { return req.visitResponses(this); }
    callResponses(opts: NonReasoningOptions) { /* POST /responses */ }
    callResponsesWithReasoning(opts: ReasoningOptions) { /* POST /responses + reasoning */ }
}

interface Endpoint {
    send<R>(req: EndpointRequestVisitor<R>): R
}

abstract class BaseModel {
    abstract readonly name: string
    abstract endpoint: Endpoint
}

export class NonReasoningCall implements EndpointRequestVisitor<Promise<any>> {
  constructor(private readonly opts: NonReasoningOptions) {}
  visitChat(ep: ChatCompletionEndpoint)       { return Promise.resolve(ep.callChat(this.opts)); }
  visitResponses(ep: ResponsesEndpoint)       { return Promise.resolve(ep.callResponses(this.opts)); }
}

export class ReasoningCall implements EndpointRequestVisitor<Promise<any>| void> {
  constructor(private readonly opts: ReasoningOptions) {}
  visitChat(_: ChatCompletionEndpoint)        { throw new Error("Reasoning unsupported on /chat");}
  visitResponses(ep: ResponsesEndpoint)       { return Promise.resolve(ep.callResponsesWithReasoning(this.opts)); }
}


abstract class NonReasoningModel extends BaseModel {
    readonly kind = "non-reasoning" as const
    // No reasoning controls here—by design.
    makeRequest(opts: NonReasoningOptions) { return new NonReasoningCall(opts); }

}

abstract class ReasoningModel extends BaseModel {
    readonly kind = "reasoning" as const
    // Reasoning effort is part of the DNA
    readonly supportsReasoning = true as const

    makeRequest(opts: ReasoningOptions) { return new ReasoningCall(opts); }
}

export class Gpt41 extends NonReasoningModel {
    readonly name = "gpt-4.1" as const
    endpoint: Endpoint


}

export class Gpt5 extends ReasoningModel {
    readonly name = 'gpt-5' as const
    endpoint: Endpoint


}

abstract class Behavior {
    abstract execute(input: string): Promise<any>;
}
