import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default class SpecialtiesByIdsCriteria extends Criteria {
  constructor(ids: Array<string>) {
    super('MANY')

    this.where('id', 'IN', ids)
  }
}
