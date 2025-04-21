import MessageBus from '../../domain/buses/message-bus'
import Message from '../../domain/messages/message'
import MessageSubscriber from '../../domain/subscribers/message-subscriber'
import MessageSubscription from '../../domain/subscriptions/message-subscription'

export default class InMemoryMessageBus implements MessageBus {
  private static instance: InMemoryMessageBus
  private messageSubscriptions: { [key: string]: MessageSubscription } = {}

  protected constructor() {}

  static getInstance(): InMemoryMessageBus {
    if (!InMemoryMessageBus.instance) {
      InMemoryMessageBus.instance = new InMemoryMessageBus()
    }

    return InMemoryMessageBus.instance
  }

  publish(type: string, message: Message): void {
    const subscription = this.getSubscription(type)

    subscription.publish(message)
  }

  subscribe(type: string, messageSubscriber: MessageSubscriber): Function {
    const subscription = this.getSubscription(type)

    return subscription.subscribe(messageSubscriber)
  }

  private getSubscription(type: string): MessageSubscription {
    if (!this.messageSubscriptions[type]) {
      this.messageSubscriptions[type] = new MessageSubscription()
    }

    return this.messageSubscriptions[type]
  }
}
