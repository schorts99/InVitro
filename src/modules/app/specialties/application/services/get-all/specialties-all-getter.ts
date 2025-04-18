import Specialty from '../../../domain/entities/specialty'
import SpecialtyDao from '../../../domain/daos/specialty-dao'

export default class SpecialtiesAllGetter {
  private readonly specialtyDao: SpecialtyDao

  constructor(specialtyDao: SpecialtyDao) {
    this.specialtyDao = specialtyDao
  }

  getAll(): Promise<Specialty[]> {
    return this.specialtyDao.getAll()
  }
}
