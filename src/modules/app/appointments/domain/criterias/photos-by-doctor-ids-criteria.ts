import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default class PhotosByDoctorIdsCriteria extends Criteria {
  constructor(doctorIds: Array<string>) {
    super('MANY')

    this.where('doctorId', 'IN', doctorIds)
  }
}
