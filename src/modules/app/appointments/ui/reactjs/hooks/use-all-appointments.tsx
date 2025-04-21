import { useState, useEffect } from 'react'

import AppointmentLocalStorageDao from '../../../infrastructure/daos/appointment-local-storage-dao'
import DoctorFakeDao from '../../../../doctors/infrastructure/daos/doctor-fake-dao'
import PhotoFakeDao from '../../../../doctors/infrastructure/daos/photo-fake-dao'
import SpecialtyFakeDao from '../../../../specialties/infrastructure/daos/specialty-fake-dao'
import LocationFakeDao from '../../../../doctors/infrastructure/daos/location-fake-dao'

import AppointmentsAllGetter from '../../../application/services/get-all/appointments-all-getter'

import AppointmentAggregate from '../../../domain/aggregates/appointment-aggregate'

const appointmentLocalStorageDao = new AppointmentLocalStorageDao()
const doctorFakeDao = new DoctorFakeDao()
const photoFakeDao = new PhotoFakeDao()
const specialtyFakeDao = new SpecialtyFakeDao()
const locationFakeDao = new LocationFakeDao()
const appointmentsAllGetter = new AppointmentsAllGetter(
  appointmentLocalStorageDao,
  doctorFakeDao,
  photoFakeDao,
  specialtyFakeDao,
  locationFakeDao,
)

export default function useAllAppointments() {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentAggregate[]>([])

  useEffect(() => {
    appointmentsAllGetter.getAll()
      .then(setAppointments)
      .finally(() => setLoading(false))
  }, [])

  return {
    loading,
    appointments,
  }
}
