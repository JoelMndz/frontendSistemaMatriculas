export { IUser, ISchoolTerm }

declare global {
  interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: 'admin' | 'secretary'
  }
  interface ISchoolTerm {
    _id: string
    name: string
    description: string
    current: boolean
  }
  interface IError {
    code?: number
    title?: string
    message: string
  }

  interface IGrade {
    _id: string
    name: string
    description: string
    subjects: string[]
    parallels: IParallel[]
  }

  interface IRepresentative {
    _id: string
    fullName: string
    cedula: string
    email: string
    imageCedulaUrl: string
    birthDate: number
    address: string
  }

  interface IProfessor {
    _id: string
    fullName: string
    cedula: string
    dateBirth: number
    email: string
    address: string
    disability: string
    cv: string
  }

  interface IStudent {
    _id: string
    fullName: string
    cedula: string
    birthDate: number
    fatherName: string
    motherName: string
    address: string
    disability?: string
    allergies?: string
    cedulaImageUrl: string
    bulletinImageUrl: string
    _representative1: IRepresentative
    _representative2: IRepresentative | null
  }

  interface IParallel {
    _id: string
    name: string
    quotas: number
    _grade: IGrade
    _professor: string | IProfessor
    professors: IProfessor[]
    schoolterm: ISchoolTerm
  }

  interface IEnrollment {
    _id: string;
    _student: IStudent;
    _parallel: IParallel;
  }
}
