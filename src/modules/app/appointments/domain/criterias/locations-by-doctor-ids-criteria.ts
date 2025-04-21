import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default class LocationsByDoctorIdsCriteria extends Criteria {
  constructor(doctorIds: Array<string>) {
    super('MANY')

    this.where('doctorId', 'IN', doctorIds)
  }
}
