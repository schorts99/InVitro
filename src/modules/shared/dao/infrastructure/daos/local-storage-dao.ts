import Criteria from '../../../criteria/domain/criteria/criteria'
import { Operator } from '../../../criteria/domain/criteria/operator'
import OperatorNotMapped from '../../../criteria/domain/exceptions/operator-not-mapped'
import Order from '../../../criteria/domain/criteria/order'

export interface StorageConverter<T extends { id: string }> {
  toStorable(entity: T): Record<string, any>
  fromStorable(data: Record<string, any>): T
}

export default abstract class LocalStorageDao<Entity extends { id: string }> {
  private readonly storageKey: string
  private readonly storageConverter: StorageConverter<Entity>

  constructor(storageKey: string, storageConverter: StorageConverter<Entity>) {
    this.storageKey = storageKey
    this.storageConverter = storageConverter
  }

  private getRawEntities(): Record<string, any>[] {
    const stored = localStorage.getItem(this.storageKey)
    return stored ? JSON.parse(stored) : []
  }

  private setRawEntities(rawEntities: Record<string, any>[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(rawEntities))
  }

  private get entities(): Entity[] {
    return this.getRawEntities().map((data) => this.storageConverter.fromStorable(data))
  }

  private set entities(entities: Entity[]) {
    this.setRawEntities(entities.map((entity) => this.storageConverter.toStorable(entity)))
  }

  protected async find(id: string): Promise<Entity | null> {
    return this.entities.find((entity) => entity.id === id) ?? null
  }

  protected async findBy(criteria: Criteria): Promise<Entity | null> {
    const results = await this.executeQuery(criteria)
    return results.length > 0 ? results[0] : null
  }

  protected async getAll(): Promise<Entity[]> {
    return this.entities
  }

  protected async search(criteria: Criteria): Promise<Entity[]> {
    return this.executeQuery(criteria)
  }

  protected async create(id: string, data: Record<string, any>): Promise<Entity> {
    const newEntityData = { id, ...data }
    const newEntity = this.storageConverter.fromStorable(newEntityData)
    const currentEntities = this.entities

    currentEntities.push(newEntity)

    this.entities = currentEntities

    return newEntity
  }

  protected async update(id: string, data: Record<string, any>): Promise<Entity> {
    const currentEntities = this.entities
    const entityIndex = currentEntities.findIndex((entity) => entity.id === id)

    if (entityIndex === -1) {
      throw new Error('Entity not found')
    }

    const existingEntity = currentEntities[entityIndex]
    const updatedData = { ...this.storageConverter.toStorable(existingEntity), ...data }
    const updatedEntity = this.storageConverter.fromStorable(updatedData)
    currentEntities[entityIndex] = updatedEntity
    this.entities = currentEntities

    return updatedEntity
  }

  protected async delete(id: string): Promise<void> {
    this.entities = this.entities.filter((entity) => entity.id !== id)
  }

  private mapOperatorToArray(operator: Operator): (a: any, b: any) => boolean {
    switch (operator) {
      case 'EQUAL':
        return (a, b) => a === b
      case 'NOT_EQUAL':
        return (a, b) => a !== b
      case 'GREATER_THAN':
        return (a, b) => a > b
      case 'LESS_THAN':
        return (a, b) => a < b
      case 'IN':
        return (a, b) => (b as any[]).includes(a)
      case 'NOT_IN':
        return (a, b) => !(b as any[]).includes(a)
      default:
        throw new OperatorNotMapped(`operator: ${operator}`)
    }
  }

  private executeQuery(criteria: Criteria): Entity[] {
    let results = [...this.entities]

    for (const field in criteria.filters) {
      const filter = criteria.filters[field]
      const arrayOperator = this.mapOperatorToArray(filter.operator)

      results = results.filter((item) => arrayOperator(item[field as keyof Entity], filter.value))
    }

    criteria.orders.forEach((order: Order) => {
      if (order.direction === 'ASC') {
        results.sort((a, b) => {
          const valueA = a[order.field as keyof Entity]
          const valueB = b[order.field as keyof Entity]

          if (valueA instanceof Date && valueB instanceof Date) {
            return valueA.getTime() - valueB.getTime()
          }

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB)
          }

          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
        })
      } else if (order.direction === 'DESC') {
        results.sort((a, b) => {
          const valueA = a[order.field as keyof Entity]
          const valueB = b[order.field as keyof Entity]

          if (valueA instanceof Date && valueB instanceof Date) {
            return valueB.getTime() - valueA.getTime()
          }

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueB.localeCompare(valueA)
          }

          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0
        })
      }
    })

    if (criteria.limit) {
      results = results.slice(0, criteria.limit)
    }

    if (criteria.offset) {
      results = results.slice(criteria.offset)
    }

    return results
  }
}
