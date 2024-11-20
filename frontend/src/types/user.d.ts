export interface User {
    id:number
    name:string
    age:number         
    role:string      
    email:string      
    jobPost:Jobpost   
    company:Company  
    registered: Date 
    events:Event[]
    stands:Stand[]
}

interface JobPost {
    id:number
    name:string
}

interface Company{
    id:number
    name:string
    description?:string
}

export interface Event {
    id:number
    eventId:number,
    userId:number,
    arrivalDate:Date
    exitDate?:Date|null
}

export interface Stand {
    id:number
    standId:number,
    userId:number,
    arrivalDate:Date
    exitDate?:Date|null
}