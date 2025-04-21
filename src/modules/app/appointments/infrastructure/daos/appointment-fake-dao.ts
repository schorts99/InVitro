import FakeDao from '../../../../shared/dao/infrastructure/daos/fake-dao'

import AppointmentDao from '../../domain/daos/appointment-dao'
import Appointment from '../../domain/entities/appointment'

export default class AppointmentFakeDao extends FakeDao<Appointment> implements AppointmentDao {
  constructor() {
    const firstDate = new Date()
    const secondDate = new Date()
    const thirdDate = new Date()
    const fourthDate = new Date()

    firstDate.setHours(9)
    secondDate.setHours(10)
    thirdDate.setHours(11)
    fourthDate.setHours(12)
    
    super(
      [
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
    )
  }

  override async getAll(): Promise<Appointment[]> {
    return super.getAll()
  }
}
