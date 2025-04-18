import LocationDao from '../../domain/daos/location-dao'
import Location from '../../domain/entities/location'

export default class LocationFakeDao implements LocationDao {
  private readonly entities = [
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

  async getAll(): Promise<Location[]> {
    return this.entities;
  }
}
