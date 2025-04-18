import Doctor from '../entities/doctor'
import Criteria from '../../../../shared/criteria/domain/criteria/criteria'

export default interface DoctorDao {
  getAll(): Promise<Doctor[]>

  search(criteria: Criteria): Promise<Doctor[]>
}
