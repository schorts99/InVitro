import Appointment from '../../../domain/entities/appointment'
import AppointmentDao from '../../../domain/daos/appointment-dao'
import EventBus from '../../../../../shared/event-bus/domain/buses/event-bus'
import AppointmentCreated from '../../../domain/events/appointment-created'

export default class AppointmentCreator {
  private readonly appointmentDao: AppointmentDao
  private readonly eventBus: EventBus
  
  constructor(appointmentDao: AppointmentDao, eventBus: EventBus) {
    this.appointmentDao = appointmentDao
    this.eventBus = eventBus
  }

  async create(id: string, doctorId: string, hour: number): Promise<Appointment> {
    const date = new Date()
    
    date.setHours(hour)
    date.setMinutes(0)

    const appointment = await this.appointmentDao.create(id, { doctorId, date })
    const appointmentCreated = new AppointmentCreated(id, doctorId, date)

    this.eventBus.publish(AppointmentCreated.eventName, appointmentCreated)

    return appointment
  }
}
