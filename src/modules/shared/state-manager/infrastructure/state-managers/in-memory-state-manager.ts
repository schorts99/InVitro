import StateManager from '../../domain/state-managers/state-manager'

export default class InMemoryStateManager extends StateManager {
  constructor(state: Record<string, any> = {}) {
    super(state)
  }

  async getValue(key: string): Promise<unknown> {
    return this.state[key] || null
  }

  async setValue(key: string, value: any): Promise<void> {
    this.state[key] = value
    
    this.notifyListeners()
  }

  async removeValue(key: string): Promise<void> {
    delete this.state[key]

    this.notifyListeners()
  }
}
