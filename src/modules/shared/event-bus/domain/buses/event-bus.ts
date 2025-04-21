import Event from '../events/event'

import MessageSubscriber from '../../../message-broker/domain/subscribers/message-subscriber'

export default interface EventBus {
  publish(type: string, event: Event): void

  subscribe(type: string, messageSubscriber: MessageSubscriber): Function
}
