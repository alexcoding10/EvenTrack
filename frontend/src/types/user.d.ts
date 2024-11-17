export interface User {
    id:number
    name:string
    age:number         
    role:string      
    email:string      
    jobPost:Jobpost   
    company:Company  
    registered: Date 
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