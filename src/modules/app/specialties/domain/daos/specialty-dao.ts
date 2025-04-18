import Specialty from '../entities/specialty'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default interface SpecialtyDao {
  getAll(): Promise<Specialty[]>

  search(criteria: Criteria): Promise<Specialty[]>
}
