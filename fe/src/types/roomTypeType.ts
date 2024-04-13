import { boolean, number } from "yup"

export interface IRoomTypesAdminResponse {
    roomTypeDtos: IRoomTypeAdminResponse[]
}
export interface IRoomTypeAdminResponse {
    id: number,
    roomTypeName: string,
    isDorm: boolean,
    singleBed: number,
    doubleBed: number
}