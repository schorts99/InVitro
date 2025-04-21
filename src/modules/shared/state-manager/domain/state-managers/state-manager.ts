export default abstract class StateManager {
  state: Record<string, any>
  private listeners: Array<(state: Record<string, any>) => void> = []

  constructor(state: Record<string, any> = {}) {
    this.state = state
  }

  abstract getValue(key: string): Promise<unknown>

  abstract setValue(key: string, value: any): Promise<void>

  abstract removeValue(key: string): Promise<void>

  subscribe(listener: (state: Record<string, any>) => void): () => void {
    this.listeners.push(listener)

    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== listener
      )
    }
  }

  protected notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state))
  }
}
