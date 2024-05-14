export interface NetworkData {
    [Key: string]: string[]   
}

export interface User {
    name: string,
    email: string,
    password: string,
    id?: string,
    role: string
    token?: string
}

enum Roles {
    ADM = "adm",
    USER = "user"
}