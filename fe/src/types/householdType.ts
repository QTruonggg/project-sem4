import exp from "constants"

export interface IHouseholdsAdminResponse {
    householdDetailListForAdmin: IHouseholdAdminResponse[]
}
export interface IHouseholdAdminResponse {
    householdId: number,
    householdName: string,
    managerFirstName: string,
    managerLastName: string,
    managerPhone: string,
    managerEmail: string,
    numberOfHomestay: number,
    homestayDetailForAdminList: IhomestayDetailForAdminList[],
    avatar: string,
    coverImage: string,
    phoneNumberFirst: string,
    phoneNumberSecond: string,
    email: string,
    linkFacebook: string,
    linkTiktok: string,
    description: string,
    linkYoutube: string,
    householdStatus: string
}

export interface IhomestayDetailForAdminList {
    homestayId: number,
    homestayCode: string,
    homestayStatus: string,
    numberOfRoom: number,
    numberOfDorm: number
}

export interface IHouseholdAdminRequest {
    householdId: number,
    householdName: string,
    avatar: File
}


export interface ITop5HouseholdList {
    householdNotInTop: IHouseholdNotInTop5[];
    householdList: IHousehold[];
    topList: number[];
}

export interface IHouseholdNotInTop5 {
    householdId: number;
    householdName: string;
}

export interface IHousehold {
    id: number;
    householdName: string;
    avatar: string;
    homestay: string;
    managerFirstName: string;
    managerLastName: string;
    managerPhoneNumber: string;
    top: string;
}

export interface IHouseholdManagerInformationUpdateRequest {
    id: number | undefined;
    householdName: string;
    checkInTime: string;
    checkOutTime: string;
    cancellationPeriod: string;
    phoneNumberFirst: string;
    phoneNumberSecond: string;
    email: string;
    linkFacebook: string;
    linkTiktok: string;
    description: string;
    linkYoutube: string;
}

export interface IHouseholdManagerRuleUpdateRequest {
    id: number | undefined;
    checkInTime: string;
    checkOutTime: string;
    cancellationPeriod: string;
}

export interface addTopHousehold {
    householdId: number;
    top: number;
}


export interface IImageUpdateRequest {
    avatar: File | undefined;
    coverImage: File | undefined;
}

