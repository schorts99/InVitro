import Location from '../entities/location'

export default interface LocationDao {
  getAll(): Promise<Location[]>
}
