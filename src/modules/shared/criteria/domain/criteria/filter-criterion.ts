import { Operator } from './operator'

export default interface FilterCriterion {
  value: any
  operator: Operator
}
