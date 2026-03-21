export interface SendingClient {
	send(request: any): Promise<any>
}
