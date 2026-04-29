import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { Participant } from "@domain/agentic-environment/participant"
import { ContextItem } from "@domain/model-context/context-item/context-item"

export async function deliverStream<T extends ContextItem>(
    environment: AgenticEnvironment,
    initiator: Participant,
    stream: AsyncIterable<T>,
  ): Promise<void> {

    for await (const item of stream) {
        await environment.deliverContextItem(initiator, item);
    }
}