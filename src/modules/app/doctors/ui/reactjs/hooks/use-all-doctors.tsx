import { useState, useEffect } from 'react'

import DoctorFakeDao from '../../../infrastructure/daos/doctor-fake-dao'
import PhotoFakeDao from '../../../infrastructure/daos/photo-fake-dao'
import LocationFakeDao from '../../../infrastructure/daos/location-fake-dao'
import SpecialtyFakeDao from '../../../../specialties/infrastructure/daos/specialty-fake-dao'
import AppointmentLocalStorageDao from '../../../../appointments/infrastructure/daos/appointment-local-storage-dao'
import InMemoryEventBus from '../../../../../shared/event-bus/infrastructure/buses/in-memory-event-bus'
import InMemoryStateManager from '../../../../../shared/state-manager/infrastructure/state-managers/in-memory-state-manager'

import DoctorsAllGetter from '../../../application/services/get-all/doctors-all-getter'
import OnAppointmentCreated from '../../../../appointments/application/services/create/on-appointment-created'

import DoctorAggregate from '../../../domain/aggregates/doctor-aggregate'
import AppointmentCreated from '../../../../appointments/domain/events/appointment-created'

const doctorFakeDao = new DoctorFakeDao()
const photoFakeDao = new PhotoFakeDao()
const locationFakeDao = new LocationFakeDao()
const specialtyFakeDao = new SpecialtyFakeDao()
const appointmentLocalStorageDao = new AppointmentLocalStorageDao()
const doctorsAllGetter = new DoctorsAllGetter(
  doctorFakeDao,
  photoFakeDao,
  locationFakeDao,
  specialtyFakeDao,
  appointmentLocalStorageDao,
)
const inMemoryStateManager = new InMemoryStateManager()

export default function useAllDoctors() {
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState<DoctorAggregate[]>([])

  useEffect(() => {
    doctorsAllGetter.getAll()
      .then((doctorAggregates) => inMemoryStateManager.setValue('doctors', doctorAggregates))
      .finally(() => setLoading(false))

    const stateManagerListener = (state: Record<string, any>) => {
      setDoctors(state['doctors'])
    }
    const unsubscribeFromEvenBus = InMemoryEventBus.getInstance().subscribe(
      AppointmentCreated.eventName,
      new OnAppointmentCreated(inMemoryStateManager),
    )
    const unsubscribeFromStateManager = inMemoryStateManager.subscribe(stateManagerListener)

    return () => {
      unsubscribeFromEvenBus()
      unsubscribeFromStateManager()
    }
  }, [])

  return {
    loading,
    doctors,
  }
}
