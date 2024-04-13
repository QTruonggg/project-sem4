
export interface IServiceList {
    serviceDetailList: IService[];
    serviceListForAdd: IServiceForAdd[];
}
export interface IService {
    serviceId: number;
    serviceName: string;
    serviceAvatar: string;
    serviceDescription: string;
    serviceStatus: string;
    householdServiceId: number;
}
export interface IServiceForAdd {
    serviceId: number;
    serviceName: string;
}
export interface IAddServiceRequest {
    serviceId: number;
    serviceDescription: string;
}
export interface IEditServiceRequest {
    householdServiceId: number;
    serviceDescription: string;
}
