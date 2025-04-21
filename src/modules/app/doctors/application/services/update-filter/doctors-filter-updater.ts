import DoctorsFilterUpdated from '../../../domain/events/doctors-filter-updated'
import EventBus from '../../../../../shared/event-bus/domain/buses/event-bus'

export default class DoctorsFilterUpdater {
  private readonly eventBus: EventBus
  
  constructor(eventBus: EventBus) {
    this.eventBus = eventBus
  }

  async update(specialtyId: string | null, onlyAvailable: boolean): Promise<void> {
    const doctorsFilterUpdated = new DoctorsFilterUpdated(
      specialtyId,
      onlyAvailable,
    )

    this.eventBus.publish(
      DoctorsFilterUpdated.eventName,
      doctorsFilterUpdated,
    )
  }
}
