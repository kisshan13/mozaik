import { MessageObserver } from "../communication/message-observer"
import { MessageSender } from "../communication/message-sender"

export class MessageConnector<TMessage> implements MessageSender<TMessage> {

    private observers: MessageObserver<TMessage>[] = []
  
	subscribe(observer: MessageObserver<TMessage>): void {
		this.observers.push(observer)
	}
  
	send(message: TMessage) {
		for (const observer of this.observers) {
			observer.onMessage(message)
		}
	}

    unsubscribe(observer: MessageObserver<TMessage>): void {
        this.observers = this.observers.filter(o => o !== observer)
    }

    getSubscribers(): MessageObserver<TMessage>[] {
        return this.observers
    }

    
}