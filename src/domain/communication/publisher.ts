import { Observer } from "./observer"

export class Publisher {
    private topics: Record<string, Observer[]> = {}

    constructor() {
        this.topics = {}
    }

    subscribe(topic: string, observer: Observer) {
        if (!this.topics[topic]) {
            this.topics[topic] = []
        }
        this.topics[topic].push(observer)
    }
    
    publish(topic: string, data: unknown) {
        
        const topicObservers = this.topics[topic]
        
        if (!topicObservers) 
            return

        topicObservers.forEach(observer => observer.onMessage(topic, data))
    }
}
