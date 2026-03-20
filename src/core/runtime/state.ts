import { DefaultEndpointResolver } from "@providers/endpoint-resolver"
import { RuntimeContext } from "."

export enum StateId {
    ENDPOINT_RESOLVER,
    REQUEST_MAPPING,
    REQUEST_DISPATCH,
    CALCULATE_COST,
    DECISION,
    TOOL_CALLING,
    RESPONSE_PROCESSING,
    COMPLETED,
    FAILED
}

export enum ExecutionStatus {
    RUNNING,
    COMPLETED,
    FAILED
}

export interface TransitionRecord {
    fromState: StateId
    toState: StateId
    timestamp: Date
    duration: number
    error: Error | null
}

export class Execution {

    executionId: string
    currentState: StateId
    previousState: StateId | null
    status: ExecutionStatus
    stepCount: number
    retryCounts: Map<StateId, number>
    history: TransitionRecord[]

    constructor(executionId: string) {
        this.executionId = executionId
        this.currentState = StateId.ENDPOINT_RESOLVER
        this.previousState = null
        this.status = ExecutionStatus.RUNNING
        this.stepCount = 0
        this.retryCounts = new Map<StateId, number>()
        this.history = []
    }

    isTerminal(): boolean {
        return this.status == ExecutionStatus.COMPLETED
            || this.status == ExecutionStatus.FAILED;
    }
}

export interface Transition {
    apply(execution: Execution, context: RuntimeContext): Promise<void>
}

export class GoTo implements Transition {
    next: StateId

    constructor(next: StateId) {
        this.next = next
    }

    async apply(execution: Execution, context: RuntimeContext): Promise<void> {
        execution.previousState = execution.currentState;
        execution.currentState = this.next;
        execution.stepCount++;
        execution.history.push({
            fromState: execution.previousState,
            toState: execution.currentState,
            timestamp: new Date(),
            duration: 0,
            error: null
        })
    }
}

export class Complete implements Transition {

    result: string
    constructor(result: string) {
        this.result = result
    }

    async apply(execution: Execution, context: RuntimeContext): Promise<void> {
        execution.status = ExecutionStatus.COMPLETED
    }
}

export class Fail implements Transition {
    error: string

    constructor(error: string) {
        this.error = error
    }

    async apply(execution: Execution, context: RuntimeContext): Promise<void> {
        execution.status = ExecutionStatus.FAILED
    }
}

export interface State {
    run(execution: Execution, context: RuntimeContext): Promise<Transition>
}

export class EndpointResolverState implements State {
    async run(execution: Execution, context: RuntimeContext): Promise<Transition> {
        const endpoint = new DefaultEndpointResolver()
        .resolve(context.request.model)
        context.endpoint = endpoint
        execution.currentState = StateId.REQUEST_MAPPING
        return new GoTo(StateId.REQUEST_MAPPING)
    }
}

export class RequestMappingState implements State {
    async run(execution: Execution, context: RuntimeContext): Promise<Transition> {
        const endpoint = context.endpoint

        if (!endpoint) {
            throw new Error("Endpoint not found")
        }

        const providerRequest = endpoint.buildRequest(context.request)
        context.providerRequest = providerRequest
        
        return new GoTo(StateId.REQUEST_DISPATCH)
    }
}

export class RequestDispatchState implements State {
    async run(execution: Execution, context: RuntimeContext): Promise<Transition> {

        const providerRequest = context.providerRequest
        const endpoint = context.endpoint

        if (!providerRequest) {
            throw new Error("Provider request not found")
        }

        if (!endpoint) {
            throw new Error("Endpoint not found")
        }

        const providerResponse = await endpoint.sendRequest(providerRequest)
        context.providerResponse = providerResponse

        return new GoTo(StateId.CALCULATE_COST)
    }
}

export class CalculateCostState implements State {
    async run(execution: Execution, context: RuntimeContext): Promise<Transition> {

        return new GoTo(StateId.DECISION)
    }
}

export class ToolCallingState implements State {
    async run(execution: Execution, context: RuntimeContext): Promise<Transition> {


        const providerResponse = context.providerResponse

        if (!providerResponse) {
            throw new Error("Provider response not found")
        }



        return new GoTo(StateId.RESPONSE_PROCESSING)
    }
}

export class ResponseProcessingState implements State {
    async run(execution: Execution, context: RuntimeContext): Promise<Transition> {


        return new GoTo(StateId.COMPLETED)
    }
}