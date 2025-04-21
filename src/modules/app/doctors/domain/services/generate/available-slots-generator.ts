import Doctor from '../../entities/doctor'
import Appointment from '../../../../appointments/domain/entities/appointment'

export default class AvailableSlotsGenerator {
  static generate(doctor: Doctor, appointments: Array<Appointment>): Array<string> {
    const startHour = parseInt(doctor.schedule.start.split(':')[0], 10)
    const endHour = parseInt(doctor.schedule.end.split(':')[0], 10)
    const allHourSlots: number[] = []

    for (let hour = startHour; hour < endHour; hour++) {
      allHourSlots.push(hour)
    }

    if (appointments.length === 0) {
      return allHourSlots.map((hour) => `${hour}:00`)
    }

    const bookedHours = new Set(appointments.map((appointment) => appointment.date.getHours()))
    const availableHourSlots = allHourSlots.filter((hour) => !bookedHours.has(hour))

    return availableHourSlots.map((hour) => `${hour}:00`)
  }
}
