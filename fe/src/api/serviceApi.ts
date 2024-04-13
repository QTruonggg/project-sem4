import { AdminServiceList, AdminServiceRequest, AdminUpdateServiceRequest, IHouseholdServiceSearchResult, IServiceIdList, IServiceList } from "@/types/serviceType";
import axiosClient from "./axiosClient";
import { IMessagesResponse } from "@/types/apiReturnType";

const serviceApi = {
    getServiceList: (): Promise<IServiceList> => {
        return axiosClient.get('/customer/service');
    },
    searchHouseholdByServiceList: (serviceIdList: IServiceIdList): Promise<IHouseholdServiceSearchResult> => {
        return axiosClient.post('/customer/service/search-by-service', serviceIdList);
    },
    getAdminServiceList: (): Promise<AdminServiceList> => {
        return axiosClient.get('/admin/service');
    },
    addAdminService: (service: AdminServiceRequest): Promise<IMessagesResponse> => {
        const formData = new FormData();
        console.log(service);
        formData.append('serviceId', "");
        formData.append('serviceName', service.serviceName);
        formData.append('serviceDescription', service.serviceDescription);
        formData.append('imageFile', service.imageFile);
        console.log(formData);
        
        return axiosClient({
            method: 'post',
            url: `/admin/service/add`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
    updateAdminService: (service: AdminUpdateServiceRequest): Promise<IMessagesResponse> => {
        const formData = new FormData();
        console.log(service);
        formData.append('serviceId', service.serviceId.toString());
        formData.append('serviceName', service.serviceName);
        formData.append('serviceDescription', service.serviceDescription);
        if(service.imageFile){
        formData.append('imageFile', service.imageFile as File);
        }
        return axiosClient({
            method: 'put',
            url: `/admin/service/edit`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }, 
    deleteAdminService: (serviceId: number): Promise<IMessagesResponse> => {
        return axiosClient.put(`/admin/service/${serviceId}/delete`);
    }

};

export default serviceApi;