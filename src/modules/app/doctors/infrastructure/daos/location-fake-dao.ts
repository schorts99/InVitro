import FakeDao from '../../../../shared/dao/infrastructure/daos/fake-dao'

import LocationDao from '../../domain/daos/location-dao'
import Location from '../../domain/entities/location'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default class LocationFakeDao extends FakeDao<Location> implements LocationDao {
  constructor() {
    super(
      [
        new Location(
          '034909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          '034909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          'Street 1',
          'Palo Alto',
          'California',
        ),
        new Location(
          '034909fe-d641-2eb9-9c9a-d4eb1ad8c6cf',
          '034909fe-d641-2eb9-9c9a-d4eb1ad8c6cf',
          'Street 2',
          'San Francisco',
          'California',
        ),
        new Location(
          '054909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          '054909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          'Street 3',
          'Los Angeles',
          'California',
        ),
        new Location(
          '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
          '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
          'Street 4',
          'Santa Rosa',
          'California',
        ),
      ]
    )
  }

  override async getAll(): Promise<Location[]> {
    return super.getAll()
  }

  override async search(criteria: Criteria): Promise<Location[]> {
    return super.search(criteria)
  }
}
