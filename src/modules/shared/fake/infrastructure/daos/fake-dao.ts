import Criteria from '../../../criteria/domain/criteria/criteria'
import { Operator } from '../../../criteria/domain/criteria/operator'
import OperatorNotMapped from '../../../criteria/domain/exceptions/operator-not-mapped'
import Order from '../../../criteria/domain/criteria/order'

export default abstract class FakeDao<Entity extends { id: string }> {
  private entities: Array<Entity>
  
  
  constructor(entities: Array<Entity>) {
    this.entities = entities
  }

  protected async find(id: string): Promise<Entity | null> {
    return this.entities.find((entity) => entity.id === id) ?? null
  }

  protected async findBy(criteria: Criteria): Promise<Entity | null> {
    const results = await this.executeQuery(criteria)

    if (results.length > 0) {
      return results[0]
    }

    return null
  }

  protected async getAll(): Promise<Entity[]> {
    return this.entities
  }

  protected async search(criteria: Criteria): Promise<Entity[]> {
    return this.executeQuery(criteria)
  }

  protected async create(id: string, data: Record<string, any>): Promise<Entity> {
    const newEntity = { id, ...data } as Entity

    this.entities.push(newEntity)

    return newEntity
  }

  protected async update(id: string, data: Record<string, any>): Promise<Entity> {
    const entityIndex = this.entities.findIndex((entity) => entity.id === id)

    if (entityIndex === -1) {
      throw new Error('Entity not found')
    }

    this.entities[entityIndex] = { ...this.entities[entityIndex], ...data }

    return this.entities[entityIndex]
  }

  protected async delete(id: string): Promise<void> {
    this.entities = this.entities.filter((entity) => entity.id !== id)
  }

  private mapOperatorToArray(operator: Operator): (a: any, b: any) => boolean {
    switch (operator) {
      case "EQUAL":
        return (a, b) => a === b;
      case "NOT_EQUAL":
        return (a, b) => a !== b;
      case "GREATER_THAN":
        return (a, b) => a > b;
      case "LESS_THAN":
        return (a, b) => a < b;
      case "IN":
        return (a, b) => (b as any[]).includes(a);
      case "NOT_IN":
        return (a, b) => !(b as any[]).includes(a);
      default:
        throw new OperatorNotMapped(`operator: ${operator}`);
    }
  }

  private executeQuery(criteria: Criteria): Array<Entity> {
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

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB);
          }

          return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0
        })
      } else if (order.direction === 'DESC') {
        results.sort((a, b) => {
          const valueA = a[order.field as keyof Entity]
          const valueB = b[order.field as keyof Entity]

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueB.localeCompare(valueA)
          }

          return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0
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
