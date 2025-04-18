import FilterCriterion from './filter-criterion'
import { Operator } from './operator'

export default function makeFilter<Type>(
  value: Type,
  operator: Operator = 'EQUAL',
): FilterCriterion {
  return { value, operator }
}
