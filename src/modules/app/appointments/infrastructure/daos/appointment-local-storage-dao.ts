import LocalStorageDao, { StorageConverter } from '../../../../shared/dao/infrastructure/daos/local-storage-dao'

import AppointmentDao from '../../domain/daos/appointment-dao'
import Appointment from '../../domain/entities/appointment'

class AppointmentStorageConverter implements StorageConverter<Appointment> {
  toStorable(appointment: Appointment): Record<string, any> {
    return { ...appointment, date: appointment.date.toISOString() }
  }

  fromStorable(data: Record<string, any>): Appointment {
    return new Appointment(data.id, data.doctorId, new Date(data.date))
  }
}

export default class AppointmentLocalStorageDao extends LocalStorageDao<Appointment> implements AppointmentDao {
  constructor() {
    const firstDate = new Date()
    const secondDate = new Date()
    const thirdDate = new Date()
    const fourthDate = new Date()

    firstDate.setHours(9)
    firstDate.setMinutes(0)
    secondDate.setHours(10)
    secondDate.setMinutes(0)
    thirdDate.setHours(11)
    thirdDate.setMinutes(0)
    fourthDate.setHours(12)
    fourthDate.setMinutes(0)

    const seedEntities = [
      new Appointment(
        '6685d16d-1b1c-4fde-9be1-a6a824cc72c9',
        '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
        firstDate,
      ),
      new Appointment(
        '6685d16d-1b1c-4fde-9be1-a6a824cc72c8',
        '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
        secondDate,
      ),
      new Appointment(
        '6685d12d-1b1c-4fde-9be1-a6a824cc72c9',
        '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
        thirdDate,
      ),
      new Appointment(
        '6685d16d-2b2c-4fde-9be1-a6a824cc72c9',
        '034909fe-d641-4eb3-9c9a-d4eb1at8c6nf',
        fourthDate,
      ),
    ]

    const storageConverter = new AppointmentStorageConverter()

    if (!localStorage.getItem('appointments')) {
      localStorage.setItem('appointments', JSON.stringify(seedEntities.map(storageConverter.toStorable)))
    }

    super('appointments', storageConverter)
  }

  override async getAll(): Promise<Appointment[]> {
    return super.getAll()
  }

  override async create(id: string, data: { doctorId: string, date: Date }): Promise<Appointment> {
    return super.create(id, data)
  }
}
