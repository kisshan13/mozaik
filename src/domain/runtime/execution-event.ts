export class ExecutionEvent {
    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly timestamp: Date = new Date(),
        public readonly metadata: Record<string, unknown> = {}
    ) {}

    getId(): string {
        return this.id
    }

    getType(): string {
        return this.type
    }

    getTimestamp(): Date {
        return this.timestamp
    }

    getMetadata(): Record<string, unknown> {
        return this.metadata
    }
}