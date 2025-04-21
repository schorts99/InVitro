import { v4 } from 'uuid'

export default class UuidGenerator {
  static generate(): string {
    return v4()
  }
}
