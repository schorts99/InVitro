import UuidGenerator from '../../../uuid/infrastructure/generate/uuid-generator'

import Message from '../../../message-broker/domain/messages/message'

export default abstract class Event implements Message {
  public id: string
  public timestamp: Date

  constructor() {
    this.id = UuidGenerator.generate()
    this.timestamp = new Date()
  }
}
