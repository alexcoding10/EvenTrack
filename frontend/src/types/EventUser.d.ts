export interface EventUser{
    id:number
    eventId:number
    userId:number
    arrivalDate:Date
    exitDate:Date|null
    event:{
        id:number
        name:string
        date:Date
    }

}