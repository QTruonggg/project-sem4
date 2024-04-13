import { GetAllHouseholManager } from "@/types/dashboardType";
import axiosClient from "./axiosClient";
import { IHouseholdAdminRequest, IHouseholdManagerInformationUpdateRequest, IHouseholdsAdminResponse, IImageUpdateRequest, ITop5HouseholdList, addTopHousehold } from "@/types/householdType";
import { IMessagesResponse } from "@/types/apiReturnType";

const householdApi = {
    getHousehold: (): Promise<GetAllHouseholManager> => {
        return axiosClient.get(`/manager/households`);
    },
    getHouseholdsAdmin: (): Promise<IHouseholdsAdminResponse> => {
        return axiosClient.get(`admin/household`);
    },
    deleteHouseholdByAdmin: async (householdId: number): Promise<IMessagesResponse> => {
        let token = localStorage.getItem('access_token');
        try {
            const response = await axiosClient({
                method: 'DELETE',
                url: `admin/household/delete-household/${householdId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    hideHouseholdByAdmin: async (householdId: number): Promise<IMessagesResponse> => {
        let token = localStorage.getItem('access_token');
        try {
            return await axiosClient({
                method: 'PUT',
                url: `admin/household/hide-household/${householdId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
        } catch (error) {
            throw error;
        }
    },
    showHouseholdByAdmin: async (householdId: number): Promise<IMessagesResponse> => {
        let token = localStorage.getItem('access_token');
        try {
            return await axiosClient({
                method: 'PUT',
                url: `admin/household/show-household/${householdId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
        } catch (error) {
            throw error;
        }
    },
    createHouseholdByAdmin: async (data: IHouseholdAdminRequest): Promise<IMessagesResponse> => {
        const formData = new FormData();
        formData.append('householdName', data.householdName);

        if (data.avatar != undefined) {
            formData.append('avatar', data.avatar);
        }

        return await axiosClient({
            method: 'POST',
            url: `/admin/household/add-household`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

    },
    updateHouseholdByAdmin: async (data: IHouseholdAdminRequest): Promise<any> => {
        console.log('data ' + data);
        const formData = new FormData();
        formData.append('householdId', data.householdId.toString());
        formData.append('householdName', data.householdName);

        if (data.avatar != undefined) {
            formData.append('avatar', data.avatar);
        }

        console.log('formdata ' + formData);
        return await axiosClient({
            method: 'PUT',
            url: `/admin/household/edit-household`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateHouseholdInformationByManager: async (data: IHouseholdManagerInformationUpdateRequest): Promise<any> => {
        let token = localStorage.getItem('access_token');
        try {
            const response = await axiosClient({
                method: 'PUT',
                url: `manager/households/information`,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getTop5Household: (): Promise<ITop5HouseholdList> => {
        return axiosClient.get(`/admin/household/top`);
    },
    addTopHousehold: (data: addTopHousehold): Promise<IMessagesResponse> => {
        return axiosClient.post(`/admin/household/top`, data);
    },
    removeTopHousehold: (top: string): Promise<IMessagesResponse> => {
        return axiosClient.delete(`/admin/household/top/${top}`);
    },
    updateImageHousehold: async (data: IImageUpdateRequest): Promise<IImageUpdateRequest> => {
        const formData = new FormData();
        
        if (data.avatar != undefined) {
            formData.append('avatar', data.avatar as File);
        }

        if (data.coverImage != undefined) {
            formData.append('coverImage', data.coverImage as File);
        }


        return await axiosClient({
            method: 'PATCH',
            url: `/manager/households/media`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateHouseholdRuleByManager: async (data: IHouseholdManagerInformationUpdateRequest): Promise<IMessagesResponse> => {
        let token = localStorage.getItem('access_token');
        try {
            return await axiosClient({
                method: 'PUT',
                url: 'manager/households/information',
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
        } catch (error) {
            throw error;
        }
    },
    
};

export default householdApi;