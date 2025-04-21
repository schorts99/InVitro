import Doctor from '../entities/doctor'
import Photo from '../entities/photo'
import Location from '../entities/location'
import Specialty from '../../../specialties/domain/entities/specialty'

export default class DoctorAggregate {
  readonly doctor: Doctor
  readonly photo: Photo
  readonly specialty: Specialty
  readonly location: Location
  readonly isAvailable: boolean
  readonly availableSlots: Array<string>

  constructor(
    doctor: Doctor,
    photo: Photo,
    specialty: Specialty,
    location: Location,
    isAvailable: boolean,
    availableSlots: Array<string>
  ) {
    this.doctor = doctor
    this.photo = photo
    this.specialty = specialty
    this.location = location
    this.isAvailable = isAvailable
    this.availableSlots = availableSlots
  }
}
