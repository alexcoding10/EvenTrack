export interface Stand{
    stand: {
        id:number
        name:string
        description:string|null
    }

}

export interface StandUserHasVisited{
    id:number
    standId:number
    userId:number
    arrivalDate:Date
    exitDate:Date|null
    stand:Stand
}