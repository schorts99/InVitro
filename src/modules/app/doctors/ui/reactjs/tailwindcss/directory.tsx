import Filter from './components/filter'
import DoctorCard from './components/doctor-card'
import useAllDoctors from '../hooks/use-all-doctors'

export default function Directory() {
  const { doctors } = useAllDoctors()

  return (
    <>
      <Filter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.doctor.id} doctorAggregate={doctor} />
        ))}
      </div>
    </>
  )
}
