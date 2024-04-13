import { IAddServiceRequest, IEditServiceRequest, IServiceList } from "@/types/serviceManagerType";
import axiosClient from "./axiosClient";
import { IMessagesResponse } from "@/types/apiReturnType";

const serviceManagerApi = {
    getListFeedback: (): Promise<IServiceList> => {
        return axiosClient.get("/manager/service");
    },
    addService: (service: IAddServiceRequest): Promise<IMessagesResponse> => {
        return axiosClient.post("/manager/service/add", service);
    },
    editService: (service: IEditServiceRequest): Promise<IMessagesResponse> => {
        return axiosClient.post("/manager/service/edit", service);
    },
    deleteService: (householdServiceId: number): Promise<IMessagesResponse> => {
        return axiosClient.post(`/manager/service/${householdServiceId}/delete`);
    }
};

export default serviceManagerApi;