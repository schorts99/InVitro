import Event from '../../../../shared/event-bus/domain/events/event'

export default class DoctorsFilterUpdated extends Event {
  static readonly eventName = 'app.doctors.doctors_filter.filter_updated'

  readonly specialtyId: string | null
  readonly onlyAvailable: boolean

  constructor(specialtyId: string | null, onlyAvailable: boolean) {
    super()

    this.specialtyId = specialtyId
    this.onlyAvailable = onlyAvailable
  }
}
