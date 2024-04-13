import { IListFeedback } from "@/types/feedbackManagerType";
import axiosClient from "./axiosClient";
import { IMessagesResponse } from "@/types/apiReturnType";

const feedbackManagerApi = {
    getListFeedback: (): Promise<IListFeedback> => {
        return axiosClient.get("/manager/feedback");
    },
    hideFeedback: (feedbackId: number): Promise<IMessagesResponse> => {
        return axiosClient.put(`/manager/feedback/${feedbackId}/hide`);
    },
    showFeedback: (feedbackId: number): Promise<IMessagesResponse> => {
        return axiosClient.put(`/manager/feedback/${feedbackId}/show`);
    }
};

export default feedbackManagerApi;