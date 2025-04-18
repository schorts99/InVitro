import Doctor from '../../../doctors/domain/entities/doctor'
import Specialty from '../../../specialties/domain/entities/specialty'
import Appointment from '../entities/appointment'
import Photo from '../../../doctors/domain/entities/photo'

export default class AppointmentAggregate {
  readonly appointment: Appointment
  readonly doctor: Doctor
  readonly photo: Photo
  readonly specialty: Specialty

  constructor(appointment: Appointment, doctor: Doctor, photo: Photo, specialty: Specialty) {
    this.appointment = appointment
    this.doctor = doctor
    this.photo = photo
    this.specialty = specialty
  }
}
