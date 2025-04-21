import { useRef } from 'react'

import useAllSpecialties from '../../../../../specialties/ui/reactjs/hooks/use-all-specialties'

import InMemoryEventBus from '../../../../../../shared/event-bus/infrastructure/buses/in-memory-event-bus'

import DoctorsFilterUpdater from '../../../../application/services/update-filter/doctors-filter-updater'

const doctorsFilterUpdater = new DoctorsFilterUpdater(InMemoryEventBus.getInstance())

export default function Filter() {
  const { loading, specialties } = useAllSpecialties()
  const specialtyFilter = useRef<HTMLSelectElement | null>(null)
  const availabilityFilter = useRef<HTMLInputElement | null>(null)

  const handleFilterChange = () => {
    const specialtyId = specialtyFilter.current?.value || null
    const onlyAvailable = availabilityFilter.current?.checked

    doctorsFilterUpdater.update(specialtyId, !!onlyAvailable)
  }

  const clearFilters = () => {
    specialtyFilter.current!.value = ''
    availabilityFilter.current!.checked = false
    
    doctorsFilterUpdater.update(null, false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">
        Filter Options
      </h2>
      <div className="mb-4">
        <label htmlFor="specialty-filter" className="block text-gray-700 mb-2">
          Filter by Specialty:
        </label>
        <div className="relative">
          <select
            ref={specialtyFilter}
            onChange={handleFilterChange}
            className={`border rounded p-2 w-full ${loading ? 'bg-gray-200 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={loading}
          >
            <option value="">
              All Specialties
            </option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input
          ref={availabilityFilter}
          type="checkbox"
          onChange={handleFilterChange}
          className="cursor-pointer mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="text-gray-700">
          Show Available Doctors Only
        </label>
      </div>
      <button
        onClick={clearFilters}
        className="cursor-pointer bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-200"
      >
        Clear Filters
      </button>
    </div>
  )
}
