import { IAreaRequestAdmin, IAreasResponse } from "@/types/areaType";
import axiosClient from "./axiosClient";

const areaApi = {
    getAllArea: (): Promise<IAreasResponse> => {
        return axiosClient.get(`admin/areas`);
    },

    deleteArea: async (id: number): Promise<IAreasResponse> => {
        let token = localStorage.getItem('access_token');

        try {
            const response = await axiosClient({
                method: 'DELETE',
                url: `/admin/areas/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting homestay:', error);
            throw error;
        }
    },
    createHouseholdByAdmin: async (data: IAreaRequestAdmin): Promise<any> => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image);

        const response = await axiosClient({
            method: 'POST',
            url: `/admin/areas`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    },
    updateAreaByAdmin: async (data: IAreaRequestAdmin): Promise<any> => {
        const formData = new FormData();
        formData.append('id', Number(data.id).toString());
        formData.append('name', data.name);

        if (data.image != undefined) {
            formData.append('image', data.image);
        }
    
        const response = await axiosClient({
            method: 'PUT',
            url: `/admin/areas`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return response.data;
    },
}

export default areaApi;