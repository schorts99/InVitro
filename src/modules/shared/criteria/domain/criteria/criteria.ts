import makeFilter from './filter'
import FilterCriterion from './filter-criterion'
import Order from './order'
import { Operator } from './operator'

export default class Criteria {
  readonly filters: Record<string, FilterCriterion> = {}
  readonly orders: Order[] = []
  readonly resultType: 'ONE' | 'MANY'
  limit?: number
  offset?: number

  constructor(
    resultType: Criteria['resultType'] = 'MANY',
  ) {
    this.resultType = resultType
  }

  where(
    field: string,
    operator: Operator = 'EQUAL',
    value: any,
  ): Criteria {
    this.filters[field] = makeFilter(value, operator)

    return this
  }

  orderBy(
    field: string,
    direction: 'ASC' | 'DESC' | 'NONE' = 'ASC',
  ): Criteria {
    if (direction === 'NONE') {
      this.orders.push({ field, direction })
    }

    return this
  }

  paginate(limit: number, offset: number): Criteria {
    this.limit = limit
    this.offset = offset

    return this
  }

  limitResults(limit: number): Criteria {
    this.limit = limit

    return this
  }

  offsetResults(offset: number): Criteria {
    this.offset = offset

    return this
  }
}
