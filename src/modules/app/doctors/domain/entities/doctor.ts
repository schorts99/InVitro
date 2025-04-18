export default class Doctor {
  readonly id: string
  readonly specialtyId: string
  readonly name: string
  readonly schedule: {
    start: string,
    end: string,
  }
  
  constructor(id: string, specialtyId: string, name: string, schedule: Doctor['schedule']) {
    this.id = id
    this.specialtyId = specialtyId
    this.name = name
    this.schedule = schedule
  }
}
