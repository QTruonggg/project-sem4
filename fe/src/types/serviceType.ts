import { IHousehold } from "./homestayBookingType";

export interface IServiceList {
    serviceListForCustomer: IService[];
}
export interface IService {
    serviceId: number;
    serviceName: string;
    serviceAvatar: string;
}
export interface IServiceIdList{
    serviceIdList: number[];
}
export interface IHouseholdServiceSearchResult {
    householdListForCustomer: IHousehold[];
}

export interface AdminService {
    serviceId: number;
    serviceName: string;
    serviceAvatar: string;
    serviceStatus: string;
    serviceDescription: string;
}

export interface AdminServiceList {
    serviceDetailList: AdminService[];
}
export interface AdminServiceRequest {
    serviceId: number;
    serviceName: string;
    serviceDescription: string;
    imageFile: File;
}

export interface AdminUpdateServiceRequest {
    serviceId: number;
    serviceName: string;
    serviceDescription: string;
    imageFile?: File;
}
