import { FormEvent, useEffect, useRef, useState } from 'react'

import InMemoryEventBus from '../../../../../../shared/event-bus/infrastructure/buses/in-memory-event-bus';
import AppointmentLocalStorageDao from '../../../../infrastructure/daos/appointment-local-storage-dao';
import UuidGenerator from '../../../../../../shared/uuid/infrastructure/generate/uuid-generator';

import AppointmentCreator from '../../../../application/services/create/appointment-creator';

import DoctorAggregate from '../../../../../doctors/domain/aggregates/doctor-aggregate'

const appointmentLocalStorageDao = new AppointmentLocalStorageDao()
const appointmentCreator = new AppointmentCreator(
  appointmentLocalStorageDao,
  InMemoryEventBus.getInstance(),
)

export default function AppointmentBookingModal(
  {
    doctorAggregate,
    onAppointmentCreated,
    onCancel,
  }: {
      doctorAggregate: DoctorAggregate | null,
      onAppointmentCreated: () => void,
      onCancel: () => void,
    },
) {
  const [selectedTime, setSelectedTime] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleAppointmentCreation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    await appointmentCreator.create(
      UuidGenerator.generate(),
      doctorAggregate!.doctor.id,
      parseInt(selectedTime.split(':')[0], 10),
    )

    onAppointmentCreated()
    setSelectedTime('')
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel()
    }
  }

  useEffect(() => {
    if (!doctorAggregate) return

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (modalRef.current && event.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, input, select, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    previousFocusRef.current = document.activeElement as HTMLElement

    modalRef.current?.focus()
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', handleFocusTrap)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleFocusTrap)
      previousFocusRef.current?.focus()
    };
  }, [doctorAggregate])

  if (!doctorAggregate) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md"
        tabIndex={0}
      >
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          Schedule with {doctorAggregate.doctor.name}
        </h2>
        <h3 className="text-lg mb-2">
          Available Time Slots:
        </h3>
        <form onSubmit={handleAppointmentCreation}>
          <div className="mb-4">
            <select
              value={selectedTime} 
              onChange={({ target }) => setSelectedTime(target.value)} 
              className="cursor-pointer border rounded p-2 w-full"
              required
            >
              <option value="" disabled>
                Select a time slot
              </option>
              {doctorAggregate.availableSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="cursor-pointer bg-green-600 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 transition-colors"
            disabled={!selectedTime}
          >
            Confirm Appointment
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="cursor-pointer bg-gray-300 text-gray-700 py-2 px-4 rounded mt-2 ml-2 hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}