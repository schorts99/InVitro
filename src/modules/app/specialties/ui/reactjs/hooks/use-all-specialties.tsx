import { useState, useEffect } from 'react'

import SpecialtyFakeDao from '../../../infrastructure/daos/specialty-fake-dao'

import SpecialtiesAllGetter from '../../../application/services/get-all/specialties-all-getter'

import Specialty from '../../../domain/entities/specialty'

const specialtyFakeDao = new SpecialtyFakeDao()
const specialtiesAllGetter = new SpecialtiesAllGetter(specialtyFakeDao)

export default function useAllSpecialties() {
  const [loading, setLoading] = useState(true)
  const [specialties, setSpecialties] = useState<Specialty[]>([])

  useEffect(() => {
    specialtiesAllGetter.getAll()
      .then(setSpecialties)
      .finally(() => setLoading(false))
  }, [])

  return {
    loading,
    specialties,
  }
}
