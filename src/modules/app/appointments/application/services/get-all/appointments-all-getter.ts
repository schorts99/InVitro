import AppointmentAggregate from '../../../domain/aggregates/appointment-aggregate'
import DoctorDao from '../../../../doctors/domain/daos/doctor-dao'
import SpecialtyDao from '../../../../specialties/domain/daos/specialty-dao'
import AppointmentDao from '../../../domain/daos/appointment-dao'
import PhotoDao from '../../../../doctors/domain/daos/photo-dao'
import DoctorsByIdsCriteria from '../../../domain/criterias/doctors-by-ids-criteria'
import PhotosByDoctorIdsCriteria from '../../../domain/criterias/photos-by-doctor-ids-criteria'
import SpecialtiesByIdsCriteria from '../../../../specialties/domain/criterias/specialties-by-ids-criteria'
import LocationDao from '../../../../doctors/domain/daos/location-dao'
import LocationsByDoctorIdsCriteria from '../../../domain/criterias/locations-by-doctor-ids-criteria'

export default class AppointmentsAllGetter {
  private readonly appointmentDao: AppointmentDao
  private readonly doctorDao: DoctorDao
  private readonly photoDao: PhotoDao
  private readonly specialtyDao: SpecialtyDao
  private readonly locationDao: LocationDao

  constructor(
    appointmentDao: AppointmentDao,
    doctorDao: DoctorDao,
    photoDao: PhotoDao,
    specialtyDao: SpecialtyDao,
    locationDao: LocationDao
  ) {
    this.appointmentDao = appointmentDao
    this.doctorDao = doctorDao
    this.photoDao = photoDao
    this.specialtyDao = specialtyDao
    this.locationDao = locationDao
  }

  async getAll(): Promise<AppointmentAggregate[]> {
    const appointments = await this.appointmentDao.getAll()

    if (appointments.length === 0) {
      return []
    }

    const doctorIds = appointments.map((appointment) => appointment.doctorId)
    const doctorsByIdsCriteria = new DoctorsByIdsCriteria(doctorIds)
    const doctors = await this.doctorDao.search(doctorsByIdsCriteria)
    const photosByDoctorIdsCriteria = new PhotosByDoctorIdsCriteria(doctorIds)
    const photos = await this.photoDao.search(photosByDoctorIdsCriteria)
    const specialtyIds = doctors.map((doctor) => doctor.specialtyId)
    const specialtiesByIdsCriteria = new SpecialtiesByIdsCriteria(specialtyIds)
    const specialties = await this.specialtyDao.search(specialtiesByIdsCriteria)
    const locationsByDoctorIdsCriteria = new LocationsByDoctorIdsCriteria(doctorIds)
    const locations = await this.locationDao.search(locationsByDoctorIdsCriteria)

    return appointments.map((appointment) => {
      const doctor = doctors.find((doctor) => doctor.id === appointment.doctorId)!

      return new AppointmentAggregate(
        appointment,
        doctor,
        photos.find((photo) => photo.doctorId === doctor.id)!,
        specialties.find((specialty) => specialty.id === doctor.specialtyId)!,
        locations.find((location) => location.doctorId === doctor.id)!
      )
    })
  }
}
