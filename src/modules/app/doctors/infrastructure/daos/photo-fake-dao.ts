import FakeDao from '../../../../shared/dao/infrastructure/daos/fake-dao'

import PhotoDao from '../../domain/daos/photo-dao'
import Photo from '../../domain/entities/photo'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default class PhotoFakeDao extends FakeDao<Photo> implements PhotoDao {
  constructor() {
    super(
      [
        new Photo(
          '034909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          '034909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          'jorge.png',
          '',
          'public',
        ),
        new Photo(
          '034909fe-d641-2eb9-9c9a-d4eb1ad8c6cf',
          '034909fe-d641-2eb9-9c9a-d4eb1ad8c6cf',
          'erika.png',
          '',
          'public',
        ),
        new Photo(
          '054909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          '054909fe-d641-4eb3-9c9a-d4eb1ad8c6cf',
          'nathan.png',
          '',
          'public',
        ),
        new Photo(
          '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
          '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
          'elena.png',
          '',
          'public',
        ),
      ]
    )
  }

  override async getAll(): Promise<Photo[]> {
    return super.getAll()
  }

  override async search(criteria: Criteria): Promise<Photo[]> {
    return super.search(criteria)
  }
}
