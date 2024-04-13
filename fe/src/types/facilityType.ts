export interface IFacilitiesAdminResponse {
    facilities: IFacilityAdminResponse[]
}

export interface IFacilityAdminResponse {
    id: number,
    facilityName: string,
    status: string,
}