import Message from '../messages/message'

export default interface MessageSubscriber {
  handle(message: Message): Promise<void>;
}
