import { useState, useEffect } from 'react'

import PublicImagesProvider from '../../../../../../shared/images/infrastructure/providers/public-images-provider'

import AppointmentAggregate from '../../../../domain/aggregates/appointment-aggregate'

const publicImagesProvider = new PublicImagesProvider()

export default function AppointmentCard({ appointmentAggregate }: { appointmentAggregate: AppointmentAggregate }) {
  const [photoUrl, setPhotoUrl] = useState('')
  const [loadingPhoto, setLoadingPhoto] = useState(true)
  
  useEffect(() => {
    if (!photoUrl) {
      publicImagesProvider.getUrl(appointmentAggregate.photo.name, appointmentAggregate.photo.path)
        .then(setPhotoUrl)
        .finally(() => setLoadingPhoto(false));
    }
  }, [appointmentAggregate])

  return (
    <div
      className="appointment-card border rounded-lg shadow-md p-4 mb-4 bg-white transition-transform transform hover:scale-105"
    >
      <div className="flex items-center">
        {loadingPhoto ? (
          <div className="w-12 h-12 rounded-full mr-3 animate-pulse bg-gray-200" />
        ) : (
          <img
            src={photoUrl}
            alt={`${appointmentAggregate.doctor.name}'s photo`}
            className={`w-12 h-12 rounded-full mr-3 ${!photoUrl ? 'opacity-0' : ''}`}
          />
        )}
        <div>
          <p className="font-bold">
            {appointmentAggregate.doctor.name}
          </p>
          <p className="text-gray-500">
            {appointmentAggregate.specialty.name}
          </p>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <p>
          {appointmentAggregate.appointment.date.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
