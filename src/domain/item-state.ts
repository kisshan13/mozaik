export abstract class ItemState {
	status: string

	constructor(status: string) {
		this.status = status
	}

	changeStatus(status: string): void {
		this.status = status
	}
}
