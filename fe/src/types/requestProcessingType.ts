
export interface IRequestProcessing {
    requestId: number;
    householdName: string;
    avatarHousehold: string;
    createdDate: string;
    requestTitle: string;
    requestContent: string;
    solvedDate: string;
    adminFirstName: string;
    adminLastName: string;
    status: string;
    requestResponse?: string;
}

export interface IRequestProcessingRequest {
    requestId: number;
    requestResponse: string;
    requestStatus: string;
}
export interface IRoomTypeHouseholdUpdatePrice {
    roomTypeHouseholdId: number;
    roomTypeName: string;
    imageListUri: string[];
    capacity: number;
    singleBed: number;
    doubleBed: number;
    isChildrenBed: boolean;
    facilities: string[];
    price: number;
    priceUpdate: number;
}

export interface IRequestDetail {
    householdName: string;
    avatarHousehold: string;
    managerFirstName: string;
    managerLastName: string;
    managerPhone: string;
    managerEmail: string;
    createdDate: string;
    requestTitle: string;
    requestContent: string;
    solvedDate: string;
    adminFirstName: string;
    adminLastName: string;
    requestResponse: string;
    status: string;
}

export interface IRequestProcessingDetail {
    roomTypeHouseholdUpdatePrice: IRoomTypeHouseholdUpdatePrice;
    requestDetail: IRequestDetail;
}