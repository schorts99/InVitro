import Doctor from '../../entities/doctor'
import Appointment from '../../../../appointments/domain/entities/appointment'

export default class AvailableSlotsCalculator {
  static calculate(doctor: Doctor, appointments: Array<Appointment>): number {
    const startHour = parseInt(doctor.schedule.start.split(':')[0], 10)
    const endHour = parseInt(doctor.schedule.end.split(':')[0], 10)

    return (endHour - startHour) - appointments.length
  }
}
