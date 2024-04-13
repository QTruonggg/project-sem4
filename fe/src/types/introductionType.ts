// Define types for media
export interface Media {
    id: number;
    fileName: string;
    filePath: string;
    type: string;
}

// Define types for homestay detail
export interface HomestayDetail {
    homestayId: number;
    homestayCode: string;
    fullAddress: string;
    medias: Media[];
}

// Define types for room type
export interface RoomType {
    roomTypeName: string;
    capacity: number;
    singleBed: number;
    doubleBed: number;
}

// Define types for service detail
export interface ServiceDetail {
    serviceId: number;
    serviceName: string;
    serviceAvatar: string;
    serviceDescription: string;
    serviceStatus: string;
}

// Define types for household
export interface Household {
    householdId: number;
    householdName: string;
    homestayDetailForCustomerList: HomestayDetail[];
    avatar: string;
    coverImage: string;
    phoneNumberFirst: string;
    phoneNumberSecond: string;
    email: string;
    linkFacebook: string;
    linkTiktok: string;
    description: string;
    linkYoutube: string;
    householdRoomTypeForCustomerList: RoomType[];
    serviceDetailForCustomerList: ServiceDetail[];
}

export interface IntroductionRequest {
    householdId: number;
}



//PHẦN CỦA ĐỨC ANH

export interface IntroductionResponse {
    villageInformations: villageInformations[]
    totalHousehold: number,
    totalHomestay: number,
    householdResponseDtos: householdResponseDtos[],

}



export interface villageInformations {
    id: number,
    title: string,
    description: string,
    totalVisitedCustomer: number,
    totalVisitor: number,
    type: string,
    images: imagesVillageInformations[]
}

export interface householdResponseDtos {
    id: number,
    householdName: string,
    homestays: homestaysHouseholdResponseDtos[],
}

export interface homestaysHouseholdResponseDtos {
    homestayId: number,
    homestayCode: string,
}

export interface imagesVillageInformations {
    createdBy: string,
    createdDate: string,
    lastModifiedBy: string,
    lastModifiedDate: string,
    id: number,
    fileName: string,
    filePath: string,
    type: string,
}