export class BaseEvent {
	constructor(
		public readonly id: string,
		public readonly type: string,
		public readonly timestamp: Date = new Date(),
		public readonly metadata: Record<string, unknown> = {},
		public readonly initiator: string,
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

	getInitiator(): string {
		return this.initiator
	}
}
