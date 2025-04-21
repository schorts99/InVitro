import { useState } from 'react'

import Filter from './components/filter'
import DoctorCard from './components/doctor-card'
import AppointmentBookingModal from '../../../../appointments/ui/reactjs/tailwindcss/components/appointment-booking-modal'
import useAllDoctors from '../hooks/use-all-doctors'
import useFilterDoctors from '../hooks/use-filter-doctors'

import DoctorAggregate from '../../../domain/aggregates/doctor-aggregate'

export default function Directory() {
  const { doctors } = useAllDoctors()
  const { filteredDoctors, isFilterActive } = useFilterDoctors(doctors)
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAggregate | null>(null)

  return (
    <>
      <Filter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(isFilterActive ? filteredDoctors : doctors).map((doctor) => (
          <DoctorCard
            key={doctor.doctor.id}
            doctorAggregate={doctor}
            selectDoctor={setSelectedDoctor}
          />
        ))}
      </div>
      <AppointmentBookingModal
        doctorAggregate={selectedDoctor}
        onAppointmentCreated={() => setSelectedDoctor(null)}
        onCancel={() => setSelectedDoctor(null)}
      />
    </>
  )
}
