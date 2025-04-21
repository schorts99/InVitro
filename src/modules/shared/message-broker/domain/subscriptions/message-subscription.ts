import Message from '../messages/message'
import MessageSubscriber from '../subscribers/message-subscriber'

export default class MessageSubscription {
  private messageSubscribers: MessageSubscriber[] = []

  subscribe(messageSubscriber: MessageSubscriber): Function {
    this.messageSubscribers.push(messageSubscriber)

    return () => {
      this.unsubscribe(messageSubscriber)
    }
  }

  unsubscribe(messageSubscriber: MessageSubscriber): void {
    this.messageSubscribers = this.messageSubscribers.filter(
      subscriber => subscriber !== messageSubscriber
    )
  }

  publish(message: Message): void {
    this.messageSubscribers.forEach(messageSubscriber => {
      messageSubscriber.handle(message)
    })
  }
}
