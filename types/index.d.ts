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
  interface IError{
    code?:number,
    title?:string,
    message: string,
  }

  interface IGrade {
    _id: string,
    name: string,
    description: string,
    subjects: string[]
  }

  interface IRepresentative{
    _id: string,
    fullName: string,
    cedula: string,
    email: string,
    imageCedulaUrl: string,
    birthDate: number,
    address: string,
  }

  interface IProfessor {
    _id: string,
    fullName: string,
    cedula: string,
    dateBirth: number,
    email: string,
    address: string,
    disability: string,
    cv: string, 
  }
}
