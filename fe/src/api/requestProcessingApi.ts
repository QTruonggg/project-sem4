import { IRequestProcessing, IRequestProcessingDetail, IRequestProcessingRequest } from "@/types/requestProcessingType";
import axiosClient from "./axiosClient";
import { IMessagesResponse } from "@/types/apiReturnType";

const requestProcessingApi = {
    getAllRequest: (): Promise<IRequestProcessing[]> => {
        return axiosClient.get("/admin/request");
    },
    getRequestById: (id: string): Promise<IRequestProcessingDetail> => {
        return axiosClient.get(`/admin/request/${id}`);
    },
    changeRequestStatus: (data: IRequestProcessingRequest): Promise<IMessagesResponse> => {
        return axiosClient.put("/admin/request", data);
    },
    getManagerAllRequest: (): Promise<IRequestProcessing[]> => {
        return axiosClient.get("/manager/request");
    },
    deleteRequest: (id: number): Promise<IMessagesResponse> => {
        return axiosClient.delete(`/manager/request/${id}`);
    }
};

export default requestProcessingApi;
