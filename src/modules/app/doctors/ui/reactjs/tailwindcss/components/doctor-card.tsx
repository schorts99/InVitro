import { useState, useEffect } from 'react'
import PublicImagesProvider from '../../../../../../shared/images/infrastructure/providers/public-images-provider'
import DoctorAggregate from '../../../../domain/aggregates/doctor-aggregate'

const publicImagesProvider = new PublicImagesProvider();

export default function DoctorCard(
  { doctorAggregate, selectDoctor }: { doctorAggregate: DoctorAggregate, selectDoctor: (doctor: DoctorAggregate) => void }
) {
  const [photoUrl, setPhotoUrl] = useState('')
  const [loadingPhoto, setLoadingPhoto] = useState(true)

  useEffect(() => {
    publicImagesProvider.getUrl(doctorAggregate.photo.name, doctorAggregate.photo.path)
      .then(setPhotoUrl)
      .finally(() => setLoadingPhoto(false))
  }, [])

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
      <div className="flex items-center mt-1">
        <span className="text-yellow-500">
          {'★'.repeat(Math.floor(doctorAggregate.doctor.rating))}
          {'☆'.repeat(5 - Math.floor(doctorAggregate.doctor.rating))}
        </span>
        <span className="ml-2 text-gray-500">
          ({doctorAggregate.doctor.rating.toFixed(1)})
        </span>
      </div>
      {doctorAggregate.isAvailable ? (
        <button 
          onClick={() => selectDoctor(doctorAggregate)}
          className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label={`Book appointment with ${doctorAggregate.doctor.name}`}
        >
          Book Appointment
        </button>
      ) : (
        <p className="text-gray-500">
          Not available
        </p>
      )}
    </div>
  )
}
