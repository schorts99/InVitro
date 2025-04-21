import Event from '../../../../shared/event-bus/domain/events/event'

export default class AppointmentCreated extends Event {
  static readonly eventName = 'app.appointments.create.appointment_created'

  readonly id: string
  readonly doctorId: string
  readonly date: Date

  constructor(id: string, doctorId: string, date: Date) {
    super()

    this.id = id
    this.doctorId = doctorId
    this.date = date
  }
}
