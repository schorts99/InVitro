import DoctorsFilterUpdated from '../../../domain/events/doctors-filter-updated'
import DoctorAggregate from '../../../domain/aggregates/doctor-aggregate'
import MessageSubscriber from '../../../../../shared/message-broker/domain/subscribers/message-subscriber'
import StateManager from '../../../../../shared/state-manager/domain/state-managers/state-manager'

export default class OnDoctorsFilterUpdated implements MessageSubscriber {
  private readonly doctors: Array<DoctorAggregate>
  private readonly stateManager: StateManager
  
  constructor(doctors: Array<DoctorAggregate>, stateManager: StateManager) {
    this.doctors = doctors
    this.stateManager = stateManager
  }

  async handle(doctorsFilterUpdated: DoctorsFilterUpdated): Promise<void> {
    const isFilterActive = !!doctorsFilterUpdated.onlyAvailable || !!doctorsFilterUpdated.specialtyId

    if (isFilterActive) {
      const filteredDoctors = this.doctors.filter((doctor) => {
        const matchesAvailability = !doctorsFilterUpdated.onlyAvailable || doctor.isAvailable
        const matchesSpecialty = !doctorsFilterUpdated.specialtyId || doctor.specialty.id === doctorsFilterUpdated.specialtyId

        return matchesAvailability && matchesSpecialty
      })

      this.stateManager.setValue('filteredDoctors', filteredDoctors)
    } else {
      this.stateManager.setValue('filteredDoctors', [])
    }

    this.stateManager.setValue('isFilterActive', isFilterActive)
  }
}
