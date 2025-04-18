export default class Photo {
  readonly id: string
  readonly doctorId: string
  readonly name: string
  readonly path: string
  readonly provider: 'public'

  constructor(
    id: string,
    doctorId: string,
    name: string,
    path: string,
    provider: Photo['provider'],
  ) {
    this.id = id
    this.doctorId = doctorId
    this.name = name
    this.path = path
    this.provider = provider
  }
}
