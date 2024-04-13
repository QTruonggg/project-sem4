export interface householdListForSearchBooking {
    householdId: number;
    householdName: string;
}

export interface serviceList {
    serviceName: string;
    description: string;
    image: string;
}
export interface locationAndWeather {
    location: string;
    weatherIconUrl: string;
    weatherTemp: string;
    weatherDescription: string;
    weatherWarning: string;
}
export interface areaListForMap {
    homeStayId: number;
    status: string;
    area: string;
    areaName: string;
    homeStayCode: string;
    householdId: number;
    householdName: string;
    householdCoverImage: string;
    description: string;
}

export interface householdOutstanding {
    id: number;
    householdName: string;
    homestay: string;
    householdCoverImage: string;
    rateAverage: number;
    price: number;
    top: string;
}
export interface newsLatest {
    id: number;
    title: string;
    subject: string;
    shortDescription: string;
    thumbnail: string;
    readTime: number;
    createdDate: string;
}
export interface localProductOutstanding {
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    id: number;
    productName: string;
    productDescription: string;
    unit: string;
    type: string;
    lowestPrice: number;
    highestPrice: number;
    status: string;
    localProductPosition: string;
    villageMedias: villageMedias[];
}
export interface villageMedias {
    id: number;
    fileName: string;
    filePath: string;
    type: string;
    position: string;
}
export interface HomeType {
    householdListForSearchBooking: householdListForSearchBooking[];
    villageMediaOutstanding: string[];
    serviceList: serviceList[];
    locationAndWeather: locationAndWeather;
    areaListForMap: areaListForMap[];
    householdOutstanding: householdOutstanding[];
    newsLatest: newsLatest[];
    localProductOutstanding: localProductOutstanding[];
}
