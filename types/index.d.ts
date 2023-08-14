export { IUser, ISchoolTerm }

declare global {
  interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
  }

  interface ISchoolTerm {
    _id: string
    name: string
    description: string
    current: boolean
  }
}
