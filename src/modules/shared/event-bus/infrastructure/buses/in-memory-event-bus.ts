import InMemoryMessageBus from '../../../message-broker/infrastructure/buses/in-memory-message-bus'

import EventBus from '../../domain/buses/event-bus'
import Event from '../../domain/events/event'

export default class InMemoryEventBus extends InMemoryMessageBus implements EventBus {
  override publish(type: string, event: Event): void {
    super.publish(type, event)
  }
}
