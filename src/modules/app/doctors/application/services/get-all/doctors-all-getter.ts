import DoctorAggregate from '../../../domain/aggregates/doctor-aggregate'
import DoctorDao from '../../../domain/daos/doctor-dao'
import PhotoDao from '../../../domain/daos/photo-dao'
import LocationDao from '../../../domain/daos/location-dao'
import SpecialtyDao from '../../../../specialties/domain/daos/specialty-dao'
import AppointmentDao from '../../../../appointments/domain/daos/appointment-dao'
import AvailableSlotsCalculator from '../../../domain/services/calculate/available-slots-calculator'
import AvailableSlotsGenerator from '../../../domain/services/generate/available-slots-generator'

export default class DoctorsAllGetter {
  private readonly doctorDao: DoctorDao
  private readonly photoDao: PhotoDao
  private readonly locationDao: LocationDao
  private readonly specialtyDao: SpecialtyDao
  private readonly appointmentDao: AppointmentDao

  constructor(
    doctorDao: DoctorDao,
    photoDao: PhotoDao,
    locationDao: LocationDao,
    specialtyDao: SpecialtyDao,
    appointmentDao: AppointmentDao,
  ) {
    this.doctorDao = doctorDao
    this.photoDao = photoDao
    this.locationDao = locationDao
    this.specialtyDao = specialtyDao
    this.appointmentDao = appointmentDao
  }

  async getAll(): Promise<DoctorAggregate[]> {
    const doctors = await this.doctorDao.getAll()

    if (doctors.length === 0) {
      return []
    }

    const photos = await this.photoDao.getAll()
    const locations = await this.locationDao.getAll()
    const specialties = await this.specialtyDao.getAll()
    const appointments = await this.appointmentDao.getAll()

    return doctors.map((doctor) => {
      const doctorAppointments = appointments.filter((appointment) => appointment.doctorId === doctor.id)

      return new DoctorAggregate(
        doctor,
        photos.find((photo) => photo.doctorId === doctor.id)!,
        specialties.find((specialty) => specialty.id === doctor.specialtyId)!,
        locations.find((location) => location.doctorId === doctor.id)!,
        AvailableSlotsCalculator.calculate(
          doctor,
          doctorAppointments,
        ) > 0,
        AvailableSlotsGenerator.generate(
          doctor,
          doctorAppointments,
        )
      )
    })
  }
}
