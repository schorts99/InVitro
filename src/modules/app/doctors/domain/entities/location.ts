export default class Location {
  readonly id: string
  readonly doctorId: string
  readonly address: string
  readonly city: string
  readonly state: string

  constructor(
    id: string,
    doctorId: string,
    address: string,
    city: string,
    state: string,
  ) {
    this.id = id
    this.doctorId = doctorId
    this.address = address
    this.city = city
    this.state = state
  }
}
