import { useState, useEffect } from 'react'

import InMemoryEventBus from '../../../../../shared/event-bus/infrastructure/buses/in-memory-event-bus'
import InMemoryStateManager from '../../../../../shared/state-manager/infrastructure/state-managers/in-memory-state-manager'

import OnDoctorsFilterUpdated from '../../../application/services/update-filter/on-doctors-filter-updated'

import DoctorsFilterUpdated from '../../../domain/events/doctors-filter-updated'
import DoctorAggregate from '../../../domain/aggregates/doctor-aggregate'

const inMemoryStateManager = new InMemoryStateManager()

export default function useFilterDoctors(doctors: Array<DoctorAggregate>) {
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [filteredDoctors, setFilteredDoctors] = useState([])

  useEffect(() => {
    const stateManagerListener = (state: Record<string, any>) => {
      setFilteredDoctors(state['filteredDoctors'])
      setIsFilterActive(state['isFilterActive'])
    }
    const unsubscribeFromEvenBus = InMemoryEventBus.getInstance().subscribe(
      DoctorsFilterUpdated.eventName,
      new OnDoctorsFilterUpdated(doctors, inMemoryStateManager),
    )
    const unsubscribeFromStateManager = inMemoryStateManager.subscribe(stateManagerListener)

    return () => {
      unsubscribeFromEvenBus()
      unsubscribeFromStateManager()
    }
  }, [doctors])

  return {
    filteredDoctors,
    isFilterActive,
  }
}
