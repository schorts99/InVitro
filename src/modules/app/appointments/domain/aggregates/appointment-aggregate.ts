import Doctor from '../../../doctors/domain/entities/doctor'
import Specialty from '../../../specialties/domain/entities/specialty'
import Appointment from '../entities/appointment'
import Photo from '../../../doctors/domain/entities/photo'
import Location from '../../../doctors/domain/entities/location'

export default class AppointmentAggregate {
  readonly appointment: Appointment
  readonly doctor: Doctor
  readonly photo: Photo
  readonly specialty: Specialty
  readonly location: Location

  constructor(
    appointment: Appointment,
    doctor: Doctor,
    photo: Photo,
    specialty: Specialty,
    location: Location,
  ) {
    this.appointment = appointment
    this.doctor = doctor
    this.photo = photo
    this.specialty = specialty
    this.location = location
  }
}
