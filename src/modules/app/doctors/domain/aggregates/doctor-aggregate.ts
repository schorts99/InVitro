import Doctor from '../entities/doctor'
import Photo from '../entities/photo'
import Location from '../entities/location'
import Specialty from '../../../specialties/domain/entities/specialty'
import Appointment from '../../../appointments/domain/entities/appointment'

export default class DoctorAggregate {
  readonly doctor: Doctor
  readonly photo: Photo
  readonly specialty: Specialty
  readonly location: Location
  readonly appointments: Array<Appointment>

  constructor(
    doctor: Doctor,
    photo: Photo,
    specialty: Specialty,
    location: Location,
    appointments: Array<Appointment>,
  ) {
    this.doctor = doctor
    this.photo = photo
    this.specialty = specialty
    this.location = location
    this.appointments = appointments
  }
}
