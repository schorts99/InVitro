import { useState, useEffect } from 'react'

import DoctorFakeDao from '../../../infrastructure/daos/doctor-fake-dao'
import PhotoFakeDao from '../../../infrastructure/daos/photo-fake-dao'
import LocationFakeDao from '../../../infrastructure/daos/location-fake-dao'
import SpecialtyFakeDao from '../../../../specialties/infrastructure/daos/specialty-fake-dao'
import AppointmentFakeDao from '../../../../appointments/infrastructure/daos/appointment-fake-dao'

import DoctorsAllGetter from '../../../application/services/get-all/doctors-all-getter'

import DoctorAggregate from '../../../domain/aggregates/doctor-aggregate'

const doctorFakeDao = new DoctorFakeDao()
const photoFakeDao = new PhotoFakeDao()
const locationFakeDao = new LocationFakeDao()
const specialtyFakeDao = new SpecialtyFakeDao()
const appointmentFakeDao = new AppointmentFakeDao()
const doctorsAllGetter = new DoctorsAllGetter(
  doctorFakeDao,
  photoFakeDao,
  locationFakeDao,
  specialtyFakeDao,
  appointmentFakeDao,
)

export default function useAllDoctors() {
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState<DoctorAggregate[]>([])

  useEffect(() => {
    doctorsAllGetter.getAll()
      .then(setDoctors)
      .finally(() => setLoading(false))
  }, [])

  return {
    loading,
    doctors,
  }
}
