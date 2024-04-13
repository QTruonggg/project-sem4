import axiosClient from "./axiosClient";
import { IGetAllDormResponse, IGetRoomInformationToAdd, dormEditDto, responseRoomInformation } from "@/types/dashboardType";


const dormApi = {
  getAllDorm: (): Promise<IGetAllDormResponse> => {
    return axiosClient.get(`manager/room/dorm`)
  },
  deleteDorm: async (id: number): Promise<IGetAllDormResponse> => {
    let token = localStorage.getItem('access_token');
    try {
      const response = await axiosClient({
        method: 'DELETE',
        url: `/manager/room/${id}`,
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

  deleteDormSlot: async (data: dormEditDto): Promise<dormEditDto> => {
    const response = await axiosClient.delete('manager/room/dorm', {
      data
    });
    return response.data;
  },
  addDormSlot: async (data: dormEditDto): Promise<dormEditDto> => {
    const response = await axiosClient.post('manager/room/dorm', data);
    return response.data;
  },
  getRoomDormInformationToAdd: (): Promise<IGetRoomInformationToAdd> => {
    return axiosClient.get(`/manager/room/dorm/form-data`);
  },
  addRoomDorm: (data:responseRoomInformation): Promise<responseRoomInformation> => {
    return axiosClient.post(`manager/room`, data);
  },
}

export default dormApi;