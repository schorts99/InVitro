import { useState, useEffect } from 'react'

import PublicImagesProvider from '../../../../../../shared/images/infrastructure/providers/public-images-provider'

import DoctorAggregate from '../../../../domain/aggregates/doctor-aggregate'
import AvailableSlotsCalculator from '../../../../domain/services/calculate/available-slots-calculator'

const publicImagesProvider = new PublicImagesProvider()

export default function DoctorCard({ doctorAggregate }: { doctorAggregate: DoctorAggregate }) {
  const [photoUrl, setPhotoUrl] = useState('')
  const [loadingPhoto, setLoadingPhoto] = useState(true)
  const [availableSlots, setAvailableSlots] = useState(
    AvailableSlotsCalculator.calculate(doctorAggregate.doctor, doctorAggregate.appointments),
  )

  useEffect(() => {
    if (!photoUrl) {
      publicImagesProvider.getUrl(doctorAggregate.photo.name, doctorAggregate.photo.path)
        .then(setPhotoUrl)
        .finally(() => setLoadingPhoto(false));
    }

    setAvailableSlots(
      AvailableSlotsCalculator.calculate(
        doctorAggregate.doctor,
        doctorAggregate.appointments
      )
    );
  }, [doctorAggregate]);

  return (
    <div className="border rounded-lg shadow-lg p-4 m-2 transition-transform transform hover:scale-105 bg-white">
      <div className="relative">
        {loadingPhoto ? (
          <div className="animate-pulse h-32 bg-gray-200 rounded" />
        ) : (
          <img
            src={photoUrl}
            alt={`${doctorAggregate.doctor.name}'s photo`}
            className={`w-full h-64 object-cover rounded ${!photoUrl ? 'opacity-0' : ''}`}
          />
        )}
      </div>
      <h2 className="text-xl font-bold mt-2 text-gray-800">
        {doctorAggregate.doctor.name}
      </h2>
      <p className="text-gray-600">
        {doctorAggregate.specialty.name}
      </p>
      <p className="text-gray-500">
        {availableSlots > 0 ? `Available: ${availableSlots} slot${availableSlots === 1 ? '' : 's'}` : 'Not available'}
      </p>
      {availableSlots > 0 ? (
        <button 
          // onClick={() => onBook(doctorAggregate.doctor)}
          className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label={`Book appointment with ${doctorAggregate.doctor.name}`}
        >
          Book Appointment
        </button>
      ) : null}
    </div>
  );
}
