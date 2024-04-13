export interface IAreasResponse {
    areaAdminResponseDtos: IAreaResponse[]
}
export interface IAreaResponse {
    id: number,
    name: string,
    image: string,
    totalHomestay: number,
    homestays: IAreaDetailResponse[]
}

export interface IAreaDetailResponse {
    homestayId: number,
    homestayCode: string,
    householdId: number,
    householdName: string
}

export interface IAreaRequestAdmin {
    id: number,
    name: string,
    image: File
}


