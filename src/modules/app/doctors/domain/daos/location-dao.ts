import Location from '../entities/location'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default interface LocationDao {
  getAll(): Promise<Location[]>

  search(criteria: Criteria): Promise<Location[]>
}
