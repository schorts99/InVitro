import Photo from '../entities/photo'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default interface PhotoDao {
  getAll(): Promise<Photo[]>

  search(criteria: Criteria): Promise<Photo[]>
}
