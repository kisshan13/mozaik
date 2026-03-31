import { MessageObserver } from "../communication/message-observer"
import { MessageSender } from "../communication/message-sender"

export interface Connector<TMessage> extends MessageSender<TMessage>, MessageObserver<TMessage> {}