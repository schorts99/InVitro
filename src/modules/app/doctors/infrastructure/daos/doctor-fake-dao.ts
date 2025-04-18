import FakeDao from '../../../../shared/fake/infrastructure/daos/fake-dao'

import DoctorDao from '../../domain/daos/doctor-dao'
import Doctor from '../../domain/entities/doctor'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default class DoctorFakeDao extends FakeDao<Doctor> implements DoctorDao {
  constructor() {
    super(
      [
        new Doctor(
          '034909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          '69351871-420d-4a9f-900c-811be7f94c7b',
          'Jorge',
          { start: '08:00', end: '17:00' },
        ),
        new Doctor(
          '034909fe-d641-2eb9-9c9a-d4eb1ad8c6cf',
          '69351871-420d-4a9f-800c-811be7f94c7b',
          'Erika',
          { start: '10:00', end: '17:00'},
        ),
        new Doctor(
          '054909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          '69351871-420d-5b9f-900c-811be7f94c7b',
          'Nathan',
          { start: '12:00', end: '20:00' },
        ),
        new Doctor(
          '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
          '69351871-420k-4a9f-900c-811be7f94c7b',
          'Elena',
          { start: '09:00', end: '13:00' },
        ),
      ]
    )
  }

  override async getAll(): Promise<Doctor[]> {
    return super.getAll()
  }

  override async search(criteria: Criteria): Promise<Doctor[]> {
    return super.search(criteria)
  }
}
