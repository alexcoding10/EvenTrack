export interface Stand{
    stand:{

        id:number
        name:string
        description:string|null
    }
   

}

export class StandUserHasVisited{
    id:number
    standId:number
    userId:number
    arrivalDate:Date
    exitDate:Date|null
    stand:{id:number,name:string,description:string|null}
}