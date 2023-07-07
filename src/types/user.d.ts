export interface User{
    _id?:string
    name:string,
    email:string,
    password:string,
    address?:Address,
    phone?:string,
}

export interface NumberAccount{
    _id?:string,
    number:string
}


export interface Address{
    country:string,
    address:string,
    city:string,
    state:string,
    codezip:string
}

export interface ChangePassword {
    previousPassword:string,
    newPassword1:string,
    newPassword2:string
}