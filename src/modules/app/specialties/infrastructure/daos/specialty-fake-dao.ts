import FakeDao from '../../../../shared/fake/infrastructure/daos/fake-dao'

import SpecialtyDao from '../../domain/daos/specialty-dao'
import Specialty from '../../domain/entities/specialty'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default class SpecialtyFakeDao extends FakeDao<Specialty> implements SpecialtyDao {
  constructor() {
    super(
      [
        new Specialty('69351871-420d-4a9f-900c-811be7f94c7b', 'Cardiology'),
        new Specialty('69351871-420d-4a9f-800c-811be7f94c7b', 'Dermatology'),
        new Specialty('69351871-420d-5b9f-900c-811be7f94c7b', 'Orthopedics'),
        new Specialty('69351871-420k-4a9f-900c-811be7f94c7b', 'Pediat')
      ]
    )
  }

  override async getAll(): Promise<Specialty[]> {
    return super.getAll()
  }

  override async search(criteria: Criteria): Promise<Specialty[]> {
    return super.search(criteria)
  }
}
