export interface User {
    name: string,
    email: string,
    password: string,
    id?: string,
    role: string
    token?: string
}

export enum Roles {
    ADM = "adm",
    USER = "user"
}