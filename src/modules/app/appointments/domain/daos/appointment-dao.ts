import Appointment from '../entities/appointment'

export default interface AppointmentDao {
  getAll(): Promise<Appointment[]>
}
