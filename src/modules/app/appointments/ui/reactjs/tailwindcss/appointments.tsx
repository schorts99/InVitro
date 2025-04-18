import useAllAppointments from '../hooks/use-all-appointments'
import AppointmentCard from './components/appointment-card'

export default function Appointments() {
  const { appointments } = useAllAppointments()

  return (
    <div className="appointments-view p-4">
      <h2 className="text-2xl font-bold mb-4">
        Appointments
      </h2>
      {appointments.length > 0 ? (
        appointments.map((appointmentAggregate) => (
          <AppointmentCard key={appointmentAggregate.appointment.id} appointmentAggregate={appointmentAggregate} />
        ))
      ) : (
        <p>No appointments.</p>
      )}
    </div>
  )
}
