export interface IHomestaysAdminResponse {
    homestayListAdminResponseDtos: IHomestayAdminResponse[]
}

export interface IHomestayAdminResponse {
    area: string,
    homestayList: IHomestayDetailAdminResponse[]
}

export interface IHomestayDetailAdminResponse {
    id: number,
    homestayCode: string,
    capacityOfHomestay: number,
    totalRoomOfHomestay: number,
    totalDormOfHomestay: number,
    fullAddress: string,
    homestayMediaDtoList: IHomestayMediaAdminResponse[],
    homestayStatus: string,
    householdName: string,
    householderName: string,
    householdPhone: string,
    householdEmail: string
}

export interface IHomestayMediaAdminResponse {
    id: number,
    filePath: string
}

export interface IHomestayFormUpdateAdminResponse {
    homestayAdminRequestDto: IHomestayFormUpdateRequestAdmin,
    homestayAdminResponseDto: IHomestayFormUpdateResponseAdmin
}

export interface IHomestayFormUpdateRequestAdmin {
    homestayId: number,
    areaId: number,
    householdId: number,
    homestayName: string
}

export interface IHomestayFormUpdateResponseAdmin {
    areaAdminResponseDtoList: IAreaAdminResponseDtoList[],
    householdResponseDtoList: IHouseholdResponseDtoList[],
}

export interface IAreaAdminResponseDtoList {
    id: number,
    name: string,
    image: string,
    totalHomestay: number,
    homestays: null
}

export interface IHouseholdResponseDtoList {
    id: number,
    householdName: string,
    checkInTime: string,
    checkOutTime: string,
    cancellationPeriod: number,
    phoneNumberFirst: string,
    phoneNumberSecond: string,
    email: string,
    linkFacebook: string,
    linkTiktok: string,
    description: string,
    avatar: string,
    coverImage: string,
    linkYoutube: string
}