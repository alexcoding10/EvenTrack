
export interface Company{
    id:number
    address:string | null
    name: string
}

export interface JobPost{
    id:number
    name: string
}


export interface User {
    name:string
    age:number
    company:Company
    email: string
    jobPost:JobPost
    role:string
    sex:string
}