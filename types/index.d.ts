export {
  IUser
}

declare global{
  interface IUser{
    _id: string,
    firstName: string,
    lastName: string,
    email: string
  }

  interface IError{
    code?:number,
    title?:string,
    message: string,
  }
}