import { Household, IntroductionRequest, IntroductionResponse, villageInformations } from "@/types/introductionType";
import axiosClient from "./axiosClient";

const introductionApi = {
    getHouseholdIntroduction: (param: number): Promise<Household> => {
        return axiosClient.get(`/customer/household/${param}`);
    },
    getIntroductionCustomer: (): Promise<IntroductionResponse> => {
        return axiosClient.get('/village/information');
    }
};

export default introductionApi;