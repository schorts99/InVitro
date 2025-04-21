import Event from '../../../event-bus/domain/events/event'
import MessageSubscriber from '../subscribers/message-subscriber'

export default interface MessageBus {
  publish(type: string, event: Event): void

  subscribe(type: string, messageSubscriber: MessageSubscriber): Function
}
