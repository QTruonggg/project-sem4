import { IMessagesResponse } from "@/types/apiReturnType";
import axiosClient from "./axiosClient";
import { IMyFeedbackList, IUpdateFeedbackItem } from "@/types/myFeedbackType";

const myFeedbackApi = {
    getMyFeedback: (): Promise<IMyFeedbackList> => {
        return axiosClient.get('/customers/my-feedback');
    },
    getMyFeedbackDetail: (id: string): Promise<IMyFeedbackList> => {
        return axiosClient.get(`/customers/my-feedback-detail?feedbackId=${id}`);
    },
    addFeedback: (data: IUpdateFeedbackItem): Promise<IMessagesResponse> => {
        return axiosClient.post(`/customers/my-booking/add-feedback`,data);
    },
    updateFeedback: (data: IUpdateFeedbackItem): Promise<IMessagesResponse> => {
        return axiosClient.put(`/customers/my-booking/edit-feedback`,data);
    }
};

export default myFeedbackApi;