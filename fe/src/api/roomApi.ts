import axiosClient from "./axiosClient";
import { IGetAllRoomResponse, IGetRoomInformationToAdd, responseRoomInformation, roomDetail } from "@/types/dashboardType";


const roomApi = {
    getAllRoom: (): Promise<IGetAllRoomResponse> => {
        return axiosClient.get(`manager/room`)
    },
    getRoomDetail: (id: number): Promise<roomDetail> => {
        return axiosClient.get(`manager/room/` + id)
    },
    updateRoom: (id: number, data: roomDetail): Promise<roomDetail> => {
        const { roomId, roomName, roomStatus } = data;

        const updateData = {
            roomId, roomName, roomStatus
        }
        return axiosClient.put(`manager/room/` + id, JSON.stringify(updateData));
    },
    deleteRoom: async (id: number): Promise<IGetAllRoomResponse> => {
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
      deactiveRoom: async (id: number): Promise<IGetAllRoomResponse> => {
        let token = localStorage.getItem('access_token');
       
        try {
          const response = await axiosClient({
            method: 'DELETE',
            url: `/manager/room/${id}/hide`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          });
          return response.data;
        } catch (error) {
          console.error('Error deacting room:', error);
          throw error;
        }
      },
      getRoomInformationToAdd: (): Promise<IGetRoomInformationToAdd> => {
        return axiosClient.get(`manager/room/form-data`);
      },
      addRoom: (data:responseRoomInformation): Promise<responseRoomInformation> => {

        return axiosClient.post(`manager/room`, data);
      }
}
export default roomApi;