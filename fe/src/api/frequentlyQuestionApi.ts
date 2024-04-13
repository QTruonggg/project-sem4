import { IFrequentlyQuestionFormUpdateResponse, IFrequentlyQuestionTypeResponse, IFrequentlyQuestionsByAdminResponse, IFrequentlyQuestionsForCustomer } from "@/types/frequentlyQuestionType";
import axiosClient from "./axiosClient";

const frequentlyQuestionApi = {
    getAllfrequentlyQuestionByAdmin: (): Promise<IFrequentlyQuestionsByAdminResponse> => {
        return axiosClient.get(`admin/village/frequently-questions`);
    },
    getQuestionFormCreateAdmin: (): Promise<IFrequentlyQuestionTypeResponse> => {
        return axiosClient.get(`admin/village/frequently-questions/form-create`);
    },
    createFrequentlyQuestionByAdmin: async (data: any): Promise<any> => {
        console.log(data)
        let token = sessionStorage.getItem('access_token');

        const respones = await axiosClient({
            method: 'POST',
            data: data,
            url: `admin/village/frequently-questions`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        });
        return respones.data
    },
    getQuestionFormUpdateAdmin: (questionId : number): Promise<IFrequentlyQuestionFormUpdateResponse> => {
        return axiosClient.get(`admin/village/frequently-questions/${questionId}/form-update`);
    },
    updateFrentlyQuestionByAdmin: async (data: any): Promise<any> => {
        console.log(data)
        let token = sessionStorage.getItem('access_token');

        const respones = await axiosClient({
            method: 'PUT',
            data: data,
            url: `admin/village/frequently-questions`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        });
        return respones.data
    },
    deleteQuestionByAdmin: async (id: number): Promise<any> => {
        let token = sessionStorage.getItem('access_token');

        const respones = await axiosClient({
            method: 'DELETE',
            url: `admin/village/frequently-questions/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        });
        return respones.data
    },
    getAllfrequentlyQuestionCustomer: (): Promise<IFrequentlyQuestionsForCustomer> => {
        return axiosClient.get(`/village/frequently-questions`);
    }
}

export default frequentlyQuestionApi;