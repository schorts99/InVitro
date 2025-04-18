export default class Appointment {
  readonly id: string
  readonly doctorId: string
  readonly date: Date

  constructor(id: string, doctorId: string, date: Date) {
    this.id = id
    this.doctorId = doctorId
    this.date = date
  }
}
