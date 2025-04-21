import Appointment from '../entities/appointment'

export default interface AppointmentDao {
  getAll(): Promise<Appointment[]>

  create(id: string, data: { doctorId: string, date: Date }): Promise<Appointment>
}
