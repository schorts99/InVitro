export default class Doctor {
  readonly id: string
  readonly specialtyId: string
  readonly name: string
  readonly rating: number
  readonly schedule: {
    start: string,
    end: string,
  }
  
  constructor(
    id: string,
    specialtyId: string,
    name: string,
    rating: number,
    schedule: Doctor['schedule']
  ) {
    this.id = id
    this.specialtyId = specialtyId
    this.name = name
    this.rating = rating
    this.schedule = schedule
  }
}
