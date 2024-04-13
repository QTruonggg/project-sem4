import { IFacilitiesAdminResponse, IFacilityAdminResponse } from "@/types/facilityType";
import axiosClient from "./axiosClient";
import { IMessagesResponse } from "@/types/apiReturnType";

const facilityApi = {
    getAllFacilityByAdmin: (): Promise<IFacilitiesAdminResponse> => {
        return axiosClient.get(`admin/facilities`);
    },
    deleteFacilityByAdmin: async (id: number): Promise<IMessagesResponse> => {
        let token = localStorage.getItem('access_token');

        try {
            return await axiosClient({
                method: 'DELETE',
                url: `/admin/facilities/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
        } catch (error) {
            console.error('Error deleting facility:', error);
            throw error;
        }
    },

    createFacilityByAdmin: async (data: IFacilityAdminResponse): Promise<IMessagesResponse> => {
        let token = sessionStorage.getItem('access_token');

        return await axiosClient({
            method: 'POST',
            data: data,
            url: `admin/facilities`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        });
    },
    updateFacilityByAdmin: async (data: IFacilityAdminResponse): Promise<IMessagesResponse> => {
        let token = sessionStorage.getItem('access_token');

        return await axiosClient({
            method: 'PUT',
            data: data,
            url: `admin/facilities`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        });
    },
}

export default facilityApi;