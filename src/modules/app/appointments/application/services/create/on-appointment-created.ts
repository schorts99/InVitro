import DoctorAggregate from '../../../../doctors/domain/aggregates/doctor-aggregate'
import AppointmentCreated from '../../../domain/events/appointment-created'
import MessageSubscriber from '../../../../../shared/message-broker/domain/subscribers/message-subscriber'
import StateManager from '../../../../../shared/state-manager/domain/state-managers/state-manager'

export default class OnAppointmentCreated implements MessageSubscriber {
  private readonly stateManager: StateManager

  constructor(stateManager: StateManager) {
    this.stateManager = stateManager
  }

  async handle(appointmentCreated: AppointmentCreated): Promise<void> {
    const doctors = await this.stateManager.getValue('doctors') as Array<DoctorAggregate>
    const doctorIndex = doctors.findIndex((doctor) => doctor.doctor.id === appointmentCreated.doctorId)
    const takenSlot = `${appointmentCreated.date.getHours()}:00`
    const availableSlots = doctors[doctorIndex].availableSlots.filter((availableSlot) => availableSlot !== takenSlot)
    const isAvailable = availableSlots.length > 0

    doctors[doctorIndex] = new DoctorAggregate(
      doctors[doctorIndex].doctor,
      doctors[doctorIndex].photo,
      doctors[doctorIndex].specialty,
      doctors[doctorIndex].location,
      isAvailable,
      availableSlots,
    )

    this.stateManager.setValue('doctors', doctors)
  }
}
